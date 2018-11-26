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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * Table psm_descriptive_annotation_large_value_tbl
 *
 */
@Component
public class PsmDescriptiveAnnotationLargeValueDAO extends Limelight_JDBC_Base implements PsmDescriptiveAnnotationLargeValueDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmDescriptiveAnnotationLargeValueDAO.class );

	/**
	 * @param psmDescAnnId
	 * @return
	 * @throws SQLException
	 */

	@Override
	public String getForPsmDescAnnId( long psmDescAnnId ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT value_string FROM psm_descriptive_annotation_large_value_tbl WHERE psm_descriptive_annotation_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setLong( 1, psmDescAnnId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "value_string" );
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
}
