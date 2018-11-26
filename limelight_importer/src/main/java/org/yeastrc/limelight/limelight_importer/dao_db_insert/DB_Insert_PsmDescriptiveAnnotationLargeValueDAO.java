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
package org.yeastrc.limelight.limelight_importer.dao_db_insert;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

/**
 * Table psm_descriptive_annotation_large_value_tbl
 *
 */
public class DB_Insert_PsmDescriptiveAnnotationLargeValueDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDescriptiveAnnotationLargeValueDAO.class );

	private DB_Insert_PsmDescriptiveAnnotationLargeValueDAO() { }
	public static DB_Insert_PsmDescriptiveAnnotationLargeValueDAO getInstance() { return new DB_Insert_PsmDescriptiveAnnotationLargeValueDAO(); }
	
	private final static String INSERT_SQL = 
			"INSERT INTO psm_descriptive_annotation_large_value_tbl "
			
			+ "(psm_descriptive_annotation_id, value_string ) "
			
			+ "VALUES (?, ?)";
	
	/**
	 * This will INSERT the given data into the database
	 * @param psmDescriptiveAnnotationId
	 * @param valueString
	 * @param dbConnection
	 * @throws Exception
	 */
	public void saveToDatabase( long psmDescriptiveAnnotationId, String valueString, Connection dbConnection ) throws Exception {

		String sql = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
						
			int counter = 0;
			
			counter++;
			pstmt.setLong( counter, psmDescriptiveAnnotationId );
			counter++;
			pstmt.setString( counter, valueString );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: saveToDatabase(...) sql: " + sql
					+ ".  psmDescriptiveAnnotationId: " + psmDescriptiveAnnotationId, e );
			
			throw e;
		}
		
		
	}
}
