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
import java.sql.ResultSet;

import org.slf4j.LoggerFactory;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.slf4j.Logger;

/**
 * table isotope_label_tbl
 *
 */
public class IsotopeLabelDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( IsotopeLabelDAO_Importer.class );
	
	private IsotopeLabelDAO_Importer() { }
	public static IsotopeLabelDAO_Importer getInstance() { return new IsotopeLabelDAO_Importer(); }
	
	/**
	 * Get the id for the label name. 
	 * @param isotopeLabelName
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getIdForName( String isotopeLabelName ) throws Exception {
		
		Integer id = null;
		
		final String sql = "SELECT id FROM isotope_label_tbl WHERE name = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setString( 1, isotopeLabelName );

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						id = rs.getInt( 1 );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getIdForName(...) sql: " + sql, e );
			throw e;
		}
		
		return id;
	}

}
