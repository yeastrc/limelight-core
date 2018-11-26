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
import org.yeastrc.limelight.limelight_shared.dto.PsmFilterableAnnotationDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table psm_filterable_annotation_tbl
 *
 */
@Component
public class PsmFilterableAnnotationDAO extends Limelight_JDBC_Base implements PsmFilterableAnnotationDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmFilterableAnnotationDAO.class );
	
	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public PsmFilterableAnnotationDTO getForId( long id ) throws SQLException {
		
		PsmFilterableAnnotationDTO result = null;
		
		final String querySQL = "SELECT * FROM psm_filterable_annotation_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setLong( 1, id );
			
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


	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public PsmFilterableAnnotationDTO populateFromResultSet(	ResultSet rs) throws SQLException {
		
		
		PsmFilterableAnnotationDTO item;
		item = new PsmFilterableAnnotationDTO();
		
		item.setId( rs.getLong( "id" ) );
		item.setPsmId( rs.getLong( "psm_id" ) );
		
		item.setAnnotationTypeId( rs.getInt( "annotation_type_id" ) );

		item.setValueDouble( rs.getDouble( "value_double" ) );
		item.setValueString( rs.getString( "value_string" ) );
		
		return item;
	}
}
