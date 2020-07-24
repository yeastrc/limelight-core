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
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table psm_tbl
 *
 */
@Component
public class PsmDAO extends Limelight_JDBC_Base implements PsmDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmDAO.class );
	
	/**
	 * @param id
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public PsmDTO getById( long id ) throws SQLException {
		
		PsmDTO result = null;
		
		final String querySQL = "SELECT * FROM psm_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setLong( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new PsmDTO();
					result.setId( id );
					result.setSearchId( rs.getInt( "search_id" ) );
					result.setReportedPeptideId( rs.getInt( "reported_peptide_id" ) );
					result.setCharge( rs.getInt( "charge" ) );
					result.setScanNumber( rs.getInt( "scan_number" ) );
					int searchScanFilenameId = rs.getInt( "search_scan_file_id" );
					if ( ! rs.wasNull() ) {
						result.setSearchScanFileId( searchScanFilenameId );
					}
					int has_modifications = rs.getInt( "has_modifications" );
					if ( has_modifications == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.setHasModifications( true );
					}
					{
						int intValue = rs.getInt( "has_open_modifications" );
						if ( intValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setHasOpenModifications( true );
						}
					}
					int has_reporterIons = rs.getInt( "has_reporter_ions" );
					if ( has_reporterIons == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.setHasReporterIons( true );
					}
					result.setPrecursor_RetentionTime( rs.getBigDecimal( "precursor_retention_time" ) );
					result.setPrecursor_MZ( rs.getBigDecimal( "precursor_m_z" ) );
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
