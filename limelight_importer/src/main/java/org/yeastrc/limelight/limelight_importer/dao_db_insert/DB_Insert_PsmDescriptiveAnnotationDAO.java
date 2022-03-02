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
import org.yeastrc.limelight.limelight_shared.dto.PsmDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.AnnotationValueLocation;

/**
 * Table psm_descriptive_annotation_tbl
 *
 */
public class DB_Insert_PsmDescriptiveAnnotationDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDescriptiveAnnotationDAO.class );

	private DB_Insert_PsmDescriptiveAnnotationDAO() { }
	public static DB_Insert_PsmDescriptiveAnnotationDAO getInstance() { return new DB_Insert_PsmDescriptiveAnnotationDAO(); }

	/**
	 * This will INSERT the given PsmDescriptiveAnnotationDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( PsmDescriptiveAnnotationDTO item ) throws Exception {

		try {
			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );

		} finally {
		}
	}

	private final static String INSERT_SQL = 
			"INSERT INTO psm_descriptive_annotation_tbl "
			
			+ "(psm_id, "
			+ 	" annotation_type_id, value_location, value_string ) "
			
			+ "VALUES (?, ?, ?, ?)";
	
	/**
	 * This will INSERT the given PsmAnnotationDTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( PsmDescriptiveAnnotationDTO item, Connection dbConnection ) throws Exception {

		if ( item == null ) {
			String msg = "item to save cannot be null";
			log.error( msg );
			throw new IllegalArgumentException(msg);
		}
		
		AnnotationValueLocation annotationValueLocation = AnnotationValueLocation.LOCAL;
		
		if ( item.getValueString().length() > AnnotationValueStringLocalFieldLengthConstants.ANNOTATION_VALUE_STRING_LOCAL_FIELD_LENGTH ) {
			annotationValueLocation = AnnotationValueLocation.LARGE_VALUE_TABLE;
		}

		final String sql = INSERT_SQL;
		try {
			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

				int counter = 0;

				counter++;
				pstmt.setLong( counter, item.getPsmId() );
				counter++;
				pstmt.setInt( counter, item.getAnnotationTypeId() );

				counter++;
				pstmt.setString( counter, annotationValueLocation.value() );

				counter++;
				if ( annotationValueLocation == AnnotationValueLocation.LOCAL ) {
					pstmt.setString( counter, item.getValueString() );
				} else {

					pstmt.setString( counter, "" ); // store empty string since value stored in .._large_value table
				}	

				pstmt.executeUpdate();

				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert for " + item );
				}
			}


			if ( annotationValueLocation == AnnotationValueLocation.LARGE_VALUE_TABLE ) {
				DB_Insert_PsmDescriptiveAnnotationLargeValueDAO.getInstance().saveToDatabase( item.getId(), item.getValueString(), dbConnection );
			}

		} catch ( Exception e ) {
			log.error( "ERROR: sql: " + sql + "\nData to save: " + item, e );
			throw e;
		} finally {
			
		}
	}
	
}
