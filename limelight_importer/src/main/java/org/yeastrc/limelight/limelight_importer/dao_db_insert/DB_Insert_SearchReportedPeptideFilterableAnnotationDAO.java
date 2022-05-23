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
import java.sql.ResultSet;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.constants.AnnotationValueStringLocalFieldLengthConstants;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideFilterableAnnotationDTO;

/**
 * Table srch__rep_pept_filterable_annotation_tbl
 *
 */
public class DB_Insert_SearchReportedPeptideFilterableAnnotationDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SearchReportedPeptideFilterableAnnotationDAO.class );

	private DB_Insert_SearchReportedPeptideFilterableAnnotationDAO() { }
	public static DB_Insert_SearchReportedPeptideFilterableAnnotationDAO getInstance() { return new DB_Insert_SearchReportedPeptideFilterableAnnotationDAO(); }

	/**
	 * This will INSERT the given SearchReportedPeptideAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchReportedPeptideFilterableAnnotationDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );

		} finally {
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO srch__rep_pept_filterable_annotation_tbl "
			
			+ "(search_id, reported_peptide_id, "
			+ 	" annotation_type_id, value_double, value_string ) "
			
			+ "VALUES (?, ?, ?, ?, ?)";
	
	/**
	 * This will INSERT the given SearchReportedPeptideAnnotationDTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( SearchReportedPeptideFilterableAnnotationDTO item, Connection dbConnection ) throws Exception {

		if ( item == null ) {
			String msg = "item to save cannot be null";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {

			//  Filterable valueString must fit in the main table since it is copied from there to lookup tables.
			String msg = "For Filterable annotation: item to save ValueString cannot have length > " 
					+ AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH
					+ ", ValueString: " + item.getValueString()
					+ ", item: " + item;
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}

		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter, item.getSearchId() );
			counter++;
			pstmt.setInt( counter, item.getReportedPeptideId() );
			counter++;
			pstmt.setInt( counter, item.getAnnotationTypeId() );

			counter++;
			pstmt.setDouble( counter, item.getValueDouble() );

			counter++;
			pstmt.setString( counter, item.getValueString() );
			
			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert for " + item.getSearchId() + ", " + item.getReportedPeptideId() );
			}			
		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql + "\nData to save: " + item, e );
			throw e;
		}
	}
	
}
