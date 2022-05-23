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
import org.yeastrc.limelight.limelight_shared.dto.PsmReporterIonMassDTO;

/**
 * table psm_reporter_ion_mass_tbl
 *
 */
public class DB_Insert_PsmReporterIonMassDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmReporterIonMassDAO.class );

	private DB_Insert_PsmReporterIonMassDAO() { }
	public static DB_Insert_PsmReporterIonMassDAO getInstance() { return new DB_Insert_PsmReporterIonMassDAO(); }


	/**
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void saveToDatabase(PsmReporterIonMassDTO item ) throws Exception {

		try {

			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getInsertControlCommitConnection();
			
			saveToDatabase( item, dbConnection );
			
		} finally {
		}
	}
	
	private static final String INSERT_SQL =
			
			"INSERT INTO psm_reporter_ion_mass_tbl "
			+ " ( psm_id, reporter_ion_mass )"
			+ " VALUES ( ?, ? )";
	
	/**
	 * @param psm
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( PsmReporterIonMassDTO item, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;

			counter++;
			pstmt.setLong( counter,  item.getPsmId() );
			
			counter++;
			pstmt.setBigDecimal( counter,  item.getReporterIonMass() );

			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getLong( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert psm_dynamic_modification_tbl..." );
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + item, e );
			throw e;
		}
	}
}
