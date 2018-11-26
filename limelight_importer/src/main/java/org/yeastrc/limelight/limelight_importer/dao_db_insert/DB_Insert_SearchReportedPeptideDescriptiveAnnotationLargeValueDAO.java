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
 * Table srch__rep_pept_desc_ann_large_value_tbl
 *
 */
public class DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValueDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValueDAO.class );

	private DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValueDAO() { }
	public static DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValueDAO getInstance() { return new DB_Insert_SearchReportedPeptideDescriptiveAnnotationLargeValueDAO(); }
	
	private final static String INSERT_SQL = 
			"INSERT INTO srch__rep_pept_desc_ann_large_value_tbl "
			
			+ "(srch__rep_pept_descriptive_annotation_id, value_string ) "
			
			+ "VALUES (?, ?)";
	
	/**
	 * This will INSERT the given data into the database
	 * @param srchReportedPeptideDescriptiveAnnotationId - long due to property also used for PSM
	 * @param valueString
	 * @param dbConnection
	 * @throws Exception
	 */
	public void saveToDatabase( long srchReportedPeptideDescriptiveAnnotationId, String valueString, Connection dbConnection ) throws Exception {

		String sql = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
						
			int counter = 0;
			
			counter++;
			pstmt.setLong( counter, srchReportedPeptideDescriptiveAnnotationId );
			counter++;
			pstmt.setString( counter, valueString );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: saveToDatabase(...) sql: " + sql
					+ ".  srchReportedPeptideAnnotationId: " + srchReportedPeptideDescriptiveAnnotationId, e );
			
			throw e;
		}
		
		
	}
}
