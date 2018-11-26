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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeFilterableDTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table annotation_type_filterable_tbl
 *
 */
@Component
public class AnnotationTypeFilterableDAO extends Limelight_JDBC_Base implements AnnotationTypeFilterableDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( AnnotationTypeFilterableDAO.class );

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.AnnotationTypeFilterableDAO_IF#getForId(int)
	 */
	@Override
	public AnnotationTypeFilterableDTO getForAnnotationTypeId( int id ) throws SQLException {
		
		AnnotationTypeFilterableDTO result = null;
		
		final String querySQL = "SELECT * FROM annotation_type_filterable_tbl WHERE annotation_type_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populateFromResultSet( rs );
				}
			}
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		} catch ( SQLException e ) {
			String msg = "SQL: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		
		return result;
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.AnnotationTypeFilterableDAO_IF#populateFromResultSet(java.sql.ResultSet)
	 */
	@Override
	public AnnotationTypeFilterableDTO populateFromResultSet(	ResultSet rs) throws SQLException {
		
		AnnotationTypeFilterableDTO item;
		item = new AnnotationTypeFilterableDTO();
		
		item.setAnnotationTypeId( rs.getInt( "annotation_type_id" ) );
		
		String filterDirectionString = rs.getString( "filter_direction" );
		FilterDirectionTypeJavaCodeEnum filterDirectionType = FilterDirectionTypeJavaCodeEnum.fromValue( filterDirectionString );
		item.setFilterDirectionTypeJavaCodeEnum( filterDirectionType );

		int defaultFilterInt = rs.getInt( "default_filter" );
		if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE == defaultFilterInt ) {
			item.setDefaultFilter( false );
		} else {
			item.setDefaultFilter( true );
		}

		double defaultFilterValue = rs.getDouble( "default_filter_value" );
		if ( ! rs.wasNull() ) {
			item.setDefaultFilterValue( defaultFilterValue );
		}
		
		item.setDefaultFilterValueString( rs.getString( "default_filter_value_string" ) );

		//  Values when the record was first inserted into the DB
		
		int defaultFilterAtDatabaseLoadInt = rs.getInt( "default_filter_at_database_load" );
		if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE == defaultFilterAtDatabaseLoadInt ) {
			item.setDefaultFilterAtDatabaseLoad( false );
		} else {
			item.setDefaultFilterAtDatabaseLoad( true );
		}
		double defaultFilterValueAtDatabaseLoad = rs.getDouble( "default_filter_value_at_database_load" );
		if ( ! rs.wasNull() ) {
			
			item.setDefaultFilterValueAtDatabaseLoad( defaultFilterValueAtDatabaseLoad );
		}
		item.setDefaultFilterValueStringAtDatabaseLoad( rs.getString( "default_filter_value_string_at_database_load" ) );

		int sortOrder = rs.getInt( "sort_order" );
		if ( ! rs.wasNull() ) {
			item.setSortOrder( sortOrder );
		}

		return item;
	}

}
