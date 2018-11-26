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
import org.yeastrc.limelight.limelight_webapp.searchers_results.ProteinSequenceVersionAnnotationItem;

/**
 * 
 *
 */
@Component
public class ProteinAnnotations_For_SearchID_ProteinVersionId_Searcher extends Limelight_JDBC_Base implements ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( ProteinAnnotations_For_SearchID_ProteinVersionId_Searcher.class );
			
	private static final String QUERY_SQL = 
			"SELECT psa.name, psa.description , psa.taxonomy "
			+ " FROM search__protein_sequence_version__annotation_tbl AS spsva "
			+ " INNER JOIN protein_sequence_annotation_tbl AS psa"
			+    " ON spsva.annotation_id = psa.id  "
			+ " WHERE "
			+ "  spsva.search_id = ? AND spsva.protein_sequence_version_id = ?";
			
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.ProteinAnnotations_For_SearchID_ProteinVersionId_SearcherIF#getProteinAnnotations_For_SearchID_ProteinVersionId_Searcher(int, int)
	 */
	@Override
	public List<ProteinSequenceVersionAnnotationItem>  getProteinAnnotations_For_SearchID_ProteinVersionId_Searcher( 
			
			int searchId,
			int proteinSequenceVersionId
			) throws SQLException {

		List<ProteinSequenceVersionAnnotationItem> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			preparedStatement.setInt( 2, proteinSequenceVersionId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					ProteinSequenceVersionAnnotationItem result = new ProteinSequenceVersionAnnotationItem();
					result.setName( rs.getString( "name" ) );
					result.setDescription( rs.getString( "description" ) );
					result.setTaxonomy( rs.getInt( "taxonomy" ) );
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
