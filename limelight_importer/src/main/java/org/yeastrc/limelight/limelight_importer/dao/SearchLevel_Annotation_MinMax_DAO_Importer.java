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
package org.yeastrc.limelight.limelight_importer.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.SearchLevel_Annotation_MinMax_DTO;

/**
 * table search_level_annotation_min_max_tbl
 *
 */
public class SearchLevel_Annotation_MinMax_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( SearchLevel_Annotation_MinMax_DAO_Importer.class );
	
	private SearchLevel_Annotation_MinMax_DAO_Importer() { }
	public static SearchLevel_Annotation_MinMax_DAO_Importer getInstance() { return new SearchLevel_Annotation_MinMax_DAO_Importer(); }
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchLevel_Annotation_MinMax_DTO item ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}
	
	private final static String INSERT_SQL = 
			
			"INSERT INTO search_level_annotation_min_max_tbl "
					+ " ( search_id, annotation_type_id, "
					+ " min_value_double, max_value_double, best_value_double, worst_value_double ) "
					+ " VALUES ( ?, ?, ?, ?, ?, ? ) "
					+ "  ON DUPLICATE KEY UPDATE set_1_on_insert_duplicate = 1 ";

	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchLevel_Annotation_MinMax_DTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

			int counter = 0;

			//  INSERT
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getAnnotationTypeId() );
			counter++;
			pstmt.setDouble( counter, item.getMin_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getMax_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getBest_ValueDouble() );
			counter++;
			pstmt.setDouble( counter, item.getWorst_ValueDouble() );
			
			pstmt.executeUpdate();

		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
	}
	
}
