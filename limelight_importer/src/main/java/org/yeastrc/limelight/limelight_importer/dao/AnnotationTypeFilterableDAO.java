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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;

/**
 * Table annotation_type_filterable_tbl
 *
 */
public class AnnotationTypeFilterableDAO {
	
	private static final Logger log = LoggerFactory.getLogger( AnnotationTypeFilterableDAO.class );
	
	private AnnotationTypeFilterableDAO() { }
	public static AnnotationTypeFilterableDAO getInstance() { return new AnnotationTypeFilterableDAO(); }
	
	/**
	 * This will INSERT the given AnnotationTypeFilterableDTO into the database.
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( AnnotationTypeFilterableDTO item ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {
			saveToDatabase( item, dbConnection );
		}
	}
	
	private final static String INSERT_SQL = 
			"INSERT INTO annotation_type_filterable_tbl "
			
			+ "( annotation_type_id, filter_direction, "
			+ 	" default_filter, "
			+ 	" default_filter_value, default_filter_value_string, sort_order,"
			+ 	" default_filter_at_database_load, default_filter_value_at_database_load,"
			+ 	" default_filter_value_string_at_database_load ) "
			
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? )";
		
	/**
	 * This will INSERT the given AnnotationTypeFilterableDTO into the database
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( AnnotationTypeFilterableDTO item, Connection dbConnection ) throws Exception {
		
		if ( log.isDebugEnabled() ) {
			log.debug( "Saving AnnotationTypeFilterableDTO item: " + item );
		}

		final String sql = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getAnnotationTypeId() );
			
			counter++;
			pstmt.setString( counter, item.getFilterDirectionTypeJavaCodeEnum().value() );
			
			counter++;
			if ( item.isDefaultFilter() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			
			counter++;
			if ( item.getDefaultFilterValue() != null ) {
				pstmt.setDouble( counter, item.getDefaultFilterValue() );
			} else {
				pstmt.setNull( counter, java.sql.Types.DOUBLE );
			}

			counter++;
			pstmt.setString( counter, item.getDefaultFilterValueString() );

			counter++;
			if ( item.getSortOrder() != null ) {
				pstmt.setInt( counter, item.getSortOrder() );
			} else {
				pstmt.setNull( counter, java.sql.Types.INTEGER );
			}

			counter++;
			if ( item.isDefaultFilterAtDatabaseLoad() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			
			counter++;
			if ( item.getDefaultFilterValueAtDatabaseLoad() != null ) {
				pstmt.setDouble( counter, item.getDefaultFilterValueAtDatabaseLoad() );
			} else {
				pstmt.setNull( counter, java.sql.Types.DOUBLE );
			}

			counter++;
			pstmt.setString( counter, item.getDefaultFilterValueStringAtDatabaseLoad() );
			
			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql, e );
			throw e;
		}
		
	}
	
}
