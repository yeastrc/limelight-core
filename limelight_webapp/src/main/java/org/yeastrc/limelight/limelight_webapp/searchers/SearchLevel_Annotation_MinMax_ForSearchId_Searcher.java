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
 * 
 *
 */
@Component
public class SearchLevel_Annotation_MinMax_ForSearchId_Searcher extends Limelight_JDBC_Base implements SearchLevel_Annotation_MinMax_ForSearchId_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchLevel_Annotation_MinMax_ForSearchId_Searcher.class );
	
	public static class SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result {
		
		private int annotationTypeId;
		
		/**
		 * 
		 */
		private Double min_ValueDouble;
		
		/**
		 * value closest to positive infinity
		 */
		private Double max_ValueDouble;
		
		/**
		 * best value per annotation type
		 */
		private Double best_ValueDouble;

		/**
		 * worst value per annotation type
		 */
		private Double worst_ValueDouble;

		public int getAnnotationTypeId() {
			return annotationTypeId;
		}

		public Double getMin_ValueDouble() {
			return min_ValueDouble;
		}

		public Double getMax_ValueDouble() {
			return max_ValueDouble;
		}

		public Double getBest_ValueDouble() {
			return best_ValueDouble;
		}

		public Double getWorst_ValueDouble() {
			return worst_ValueDouble;
		}
		
	}
		
	private static final String QUERY_SQL = 
			"SELECT annotation_type_id, " 
			+ " min_value_double, max_value_double, best_value_double, worst_value_double "
			+ " FROM "
			+ " search_level_annotation_min_max_tbl "
			+ " WHERE search_id = ?";

	@Override
	public List<SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result>  get_SearchLevel_Annotation_MinMax_ForSearchId( int searchId ) throws SQLException {

		List<SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, searchId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result item = new SearchLevel_Annotation_MinMax_ForSearchId_Searcher_Result();
					
					item.annotationTypeId = rs.getInt( "annotation_type_id" );
					
						item.min_ValueDouble = rs.getDouble( "min_value_double" );
						item.max_ValueDouble = rs.getDouble( "max_value_double" );
						item.best_ValueDouble = rs.getDouble( "best_value_double" );
						item.worst_ValueDouble = rs.getDouble( "worst_value_double" );
					
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
