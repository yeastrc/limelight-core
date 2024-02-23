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
 * Table srch__protein_desc_ann_large_value_tbl
 *
 */
@Component
public class Search_Protein_DescriptiveAnnotationLargeValueDAO extends Limelight_JDBC_Base implements Search_Protein_DescriptiveAnnotationLargeValueDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( Search_Protein_DescriptiveAnnotationLargeValueDAO.class );

	/**
	 * @param srchProteinDescAnnId
	 * @return
	 * @throws SQLException
	 */

	@Override
	public String getForSrchProteinDescAnnId( long srchProteinDescAnnId ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT value_string FROM srch__protein_desc_ann_large_value_tbl WHERE srch__protein_descriptive_annotation_id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setLong( 1, srchProteinDescAnnId );
			
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
