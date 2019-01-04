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
import java.sql.Statement;
import java.sql.Timestamp;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_shared.dto.ConversionProgramDTO;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;

/**
 * table conversion_program_tbl for Importer
 *
 */
public class ConversionProgramDAO {

	private static final Logger log = LoggerFactory.getLogger( ConversionProgramDAO.class );
	
	private ConversionProgramDAO() { }
	public static ConversionProgramDAO getInstance() { return new ConversionProgramDAO(); }

	private static final String INSERT_SQL =
			"INSERT INTO conversion_program_tbl "
					+ " (search_id, name, version, conversion_date, pgm_arguments, pgm_uri) "
					+ " VALUES ( ?, ?, ?, ?, ?, ? ) ";

	/**
	 * Save the given ConversionProgramDTO to the database.
	 * @param comment
	 * @throws Exception
	 */
	public void save( ConversionProgramDTO item ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		Timestamp sqlConversionDate = null;
		
		if ( item.getConversionDate() != null ) {
			sqlConversionDate = new Timestamp( item.getConversionDate().getTime() );
		}

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
				int counter = 0;
				counter++;
				pstmt.setInt( counter, item.getSearchId() );
				counter++;
				pstmt.setString( counter, item.getName() );
				counter++;
				pstmt.setString( counter, item.getVersion() );
				counter++;
				if ( sqlConversionDate != null ) {
					pstmt.setTimestamp(counter, sqlConversionDate );
				} else {
					pstmt.setNull( counter, java.sql.Types.TIMESTAMP );
				}

				counter++;
				pstmt.setString( counter, item.getPgmArguments() );
				counter++;
				pstmt.setString( counter, item.getPgmURI() );

				pstmt.executeUpdate();
			
				try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
					if( rs.next() ) {
						item.setId( rs.getInt( 1 ) );
					} else
						throw new LimelightImporterDatabaseException( "Failed to insert conversion_program_tbl" );
				}
			}
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: save(...) sql: " + sql, e );
			
			throw e;
			
		}
		
	}
}
