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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Get the name for this protein in the context of its search
 * 
 * 
 * !!!!!!!!!!!!!!  NEVER USED SO COMMENT OUT.
 * 
 * !!!!!!!!!!!!!!  CODE MAY BE INCORRECT
 * 
 */
@Component
public class ProteinNameForSearchIdProteinSequenceVersionIdSearcher extends Limelight_JDBC_Base implements ProteinNameForSearchIdProteinSequenceVersionIdSearcherIF {

//	private static final Logger log = LoggerFactory.getLogger( ProteinNameForSearchIdProteinSequenceVersionIdSearcher.class );
//
//	private static final String NAME_SQL =
//			"SELECT DISTINCT  protein_sequence_annotation_tbl.name "
//					+ " FROM protein_sequence_annotation_tbl "
//					+ " INNER JOIN search__protein_sequence_version__annotation_tbl AS spsva "
//					+ " ON protein_sequence_annotation_tbl.id = spsva.annotation_id "
//			+ " WHERE spsva.search_id = ? AND spsva.protein_sequence_version_id = ? ";
//	
//	/**
//	 * Get the name for this protein in the context of its search 
//	 * @param searchId
//	 * @param proteinSequenceVersionId
//	 * @return
//	 * @throws Exception
//	 */
//	@Override
//	public String getProteinNameForSearchIdProteinSequenceVersionId( int searchId, int proteinSequenceVersionId ) throws Exception {
//		
//		String result = null;
//		
//		final String querySQL = NAME_SQL;
//		
//
//		try ( Connection connection = super.getDBConnection();
//			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
//			
//			preparedStatement.setInt( 1, searchId );
//			preparedStatement.setInt( 2, proteinSequenceVersionId );
//
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//
//				StringBuilder resultsSB = new StringBuilder( 1000 );
//				while( rs.next() ) {
//					if ( resultsSB.length() > 0 ) {
//						resultsSB.append( "," );
//					}
//					resultsSB.append( rs.getString( "name" ) );
//				}
//				if ( resultsSB.length() > 0 ) {
//					result = resultsSB.toString();
//				}
//			}
//		} catch ( Exception e ) {
//			log.error( "ERROR getting protein name for search.  sql: " + querySQL, e );
//			throw e;
//		}
//		return result;		
//	}
}
