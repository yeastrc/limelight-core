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
package org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers;

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
 * For the list of Project Search Ids, 
 * retrieve the record in search_data_lookup_parameters
 * where single_project_search_id__default_values = a Project Search Id in the list
 *
 */
@Component
public class SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher extends Limelight_JDBC_Base implements SearchDataLookupParams_GetDefaultPerProjSrchId_SearcherIF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher.class );
	
	/**
	 * Result Item class
	 *
	 */
	public class SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem {
		
		private int id;
		private String hashOfMainParams;
		private int hashCollisionIndex;
		/**
		 * Set to project_search_id if this record is for the defaults 
		 * for that project_search_id and defaults computed by server
		 */
		private int singleProjectSearchIdDefaultValues;
		
		public String getHashOfMainParams() {
			return hashOfMainParams;
		}
		public void setHashOfMainParams(String hashOfParamsMD5Hex) {
			this.hashOfMainParams = hashOfParamsMD5Hex;
		}
		public int getHashCollisionIndex() {
			return hashCollisionIndex;
		}
		public void setHashCollisionIndex(int hashCollisionIndex) {
			this.hashCollisionIndex = hashCollisionIndex;
		}
		public int getSingleProjectSearchIdDefaultValues() {
			return singleProjectSearchIdDefaultValues;
		}
		public void setSingleProjectSearchIdDefaultValues(int singleProjectSearchIdDefaultValues) {
			this.singleProjectSearchIdDefaultValues = singleProjectSearchIdDefaultValues;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
	}

	private static final String QUERY_SQL_START = 
			"SELECT id, hash_of_main_params, hash_collision_index, single_project_search_id__default_values "
			+ " FROM "
			+ " search_data_lookup_parameters "
			+ " WHERE single_project_search_id__default_values IN ( ";
	

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.search_data_lookup_parameters_code.searchers.SearchDataLookupParams_GetDefaultPerProjSrchId_SearcherIF#getDefaultPerProjSrchId(java.util.List)
	 */
	@Override
	public List<SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem>  getDefaultPerProjSrchId( 
			List<Integer> projectSearchIds ) throws SQLException {
		
		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds cannot be null or empty" );
		}

		List<SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem> resultList = new ArrayList<>();

		StringBuilder querySQL_SB = new StringBuilder( 1000 );
		
		querySQL_SB.append( QUERY_SQL_START );

		boolean first_projectSearchId = true;
		for ( Integer projectSearchId : projectSearchIds ) {
			if ( first_projectSearchId ) {
				first_projectSearchId = false;
			} else {
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( projectSearchId );
		}
		querySQL_SB.append( " )" );
		
		final String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem item = new SearchDataLookupParams_GetDefaultPerProjSrchId_Searcher_ResultItem();
					item.setId( rs.getInt( "id" ) );
					item.setHashOfMainParams( rs.getString( "hash_of_main_params" ) );
					item.setHashCollisionIndex( rs.getInt( "hash_collision_index" ) );
					item.setSingleProjectSearchIdDefaultValues( rs.getInt( "single_project_search_id__default_values" ) );
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
