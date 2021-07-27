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
import org.yeastrc.limelight.limelight_webapp.searchers_results.Search__SearchDetailsDisplay_Item;

/**
 * Data for Search Details (When Expand a Search)
 *
 */
@Component
public class Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher extends Limelight_JDBC_Base implements Search__SearchDetailsDisplay_ForProjectSearchIdsSearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher.class );
	
	public enum Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path { YES, NO }
	public enum Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS { YES, NO }
	
	private static final String SELECT_START_QUERY_SQL = "SELECT ";
			
	private static final String PATH_FIELD_QUERY_SQL = " search_tbl.path, ";
	private static final String CLI_PARAMS_FIELD_QUERY_SQL = " conversion_program_tbl.pgm_arguments, ";

	private static final String MAIN_QUERY_SQL = 
			" search_tbl.fasta_filename, search_tbl.import_end_timestamp, project_search_tbl.id AS project_search_id, search_tbl.id AS search_id, "
			+ " project_search_tbl.project_id AS project_id, "
			+ " conversion_program_tbl.name, conversion_program_tbl.version, conversion_program_tbl.conversion_date, conversion_program_tbl.pgm_uri "
			+ " FROM "
			+ " project_search_tbl "
			+ " INNER JOIN search_tbl ON project_search_tbl.search_id = search_tbl.id "
			+ " LEFT OUTER JOIN conversion_program_tbl ON search_tbl.id = conversion_program_tbl.search_id "
			+ " WHERE project_search_tbl.id IN ( ";
		
	/**
	 * @param projectSearchId
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<Search__SearchDetailsDisplay_Item>  getSearch_SearchDetailsDisplay_ListForProjectSearchIds(
			List<Integer> projectSearchIds, 
			Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path retrieve_Path,
			Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS retrieve_CLI_PARAMS
			) throws SQLException {

		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
			throw new IllegalArgumentException( "projectSearchIds is null or empty" );
		}
		
		List<Search__SearchDetailsDisplay_Item> results = new ArrayList<>();

		String querySQL;
		
			
	
		StringBuilder querySQL_SB = new StringBuilder( 100000 );
		
		querySQL_SB.append( SELECT_START_QUERY_SQL );
		
		if ( retrieve_Path == Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.YES ) {
			querySQL_SB.append( PATH_FIELD_QUERY_SQL );
		}
		if ( retrieve_CLI_PARAMS == Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.YES ) {
			querySQL_SB.append( CLI_PARAMS_FIELD_QUERY_SQL );
		}
		
		querySQL_SB.append( MAIN_QUERY_SQL );
		
		for ( int count = 0; count < projectSearchIds.size(); count++ ) {
			if ( count != 0 ) {
				querySQL_SB.append( ", " );
			}
			querySQL_SB.append( "? " );
		}
		querySQL_SB.append( " )" );
		querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			for ( Integer projectSearchId : projectSearchIds ) {
				counter++;
				preparedStatement.setInt( counter, projectSearchId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					Search__SearchDetailsDisplay_Item result = new Search__SearchDetailsDisplay_Item();
					result.setProjectSearchId( rs.getInt( "project_search_id" ) );
					result.setSearchId( rs.getInt( "search_id" ) );
					if ( retrieve_Path == Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_Path.YES ) {
						result.setPath( rs.getString( "path" ) );
					}
					result.setFastaFilename( rs.getString( "fasta_filename" ) );
					result.setImportEndTimestamp( rs.getTimestamp( "import_end_timestamp" ) );

					result.setConverterProgram_Name( rs.getString( "name" ) );
					result.setConverterProgram_Version( rs.getString( "version" ) );
					result.setConverterProgram_ConversionDate( rs.getTimestamp( "conversion_date" ) );
					result.setConverterProgram_Pgm_URI( rs.getString( "pgm_uri" ) );
					if ( retrieve_CLI_PARAMS == Search__SearchDetailsDisplay_ForProjectSearchIdsSearcher__Retrieve_CLI_PARAMS.YES ) {
						result.setConverterProgram_Pgm_Arguments( rs.getString( "pgm_arguments" ) );
					}
					
					results.add(result);
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return results;
	}
	
}
