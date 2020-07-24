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
import org.yeastrc.limelight.limelight_shared.dto.SrchRepPept_PsmOpenModRounded_Lookup_DTO;

/**
 * table srch_rep_pept__psm_open_mod_rounded_lookup_tbl
 *
 */
public class DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_DAO {
	
	private static final Logger log = LoggerFactory.getLogger( DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_DAO.class );

	private DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_DAO() { }
	public static DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_DAO getInstance() { return new DB_Insert_SrchRepPept_PsmOpenModRounded_Lookup_DAO(); }
	
	private static final String INSERT_SQL = "INSERT INTO srch_rep_pept__psm_open_mod_rounded_lookup_tbl "

			+ " ( search_id, reported_peptide_id, "
			+   " psm_open_mod_mass_rounded_unique )"

			+ " VALUES ( ?, ?, ? )";
	
	/**
	 * Save the associated data to the database
	 * @param item
	 * @throws Exception
	 */
	public void save( SrchRepPept_PsmOpenModRounded_Lookup_DTO item ) throws Exception {
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		String sql = INSERT_SQL;
		
		try {

			conn = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();
			
			pstmt = conn.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
			
			
			int counter = 0;
			
			counter++;
			pstmt.setInt( counter,  item.getSearchId() );
			counter++;
			pstmt.setInt( counter,  item.getReportedPeptideId() );
			
			counter++;
			pstmt.setDouble( counter,  item.getMass() );

			pstmt.executeUpdate();

			rs = pstmt.getGeneratedKeys();
			
			if( rs.next() ) {
				
				item.setId( rs.getInt( 1 ) );
				
			} else {
				throw new LimelightImporterDatabaseException( "Failed to get inserted 'id' value. item: " + item );

				//  Inserting duplicate record so no record inserted.
				//  Need to query DB to get "id" field value using 
				//    fields that identify a "unique" record
				//    looking at the index of type UNIQUE on the table
				
			}
			
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: sql: " + sql, e );
			
			throw e;
			
		} finally {
			
			// be sure database handles are closed
			if( rs != null ) {
				try { rs.close(); } catch( Throwable t ) { ; }
				rs = null;
			}
			
			if( pstmt != null ) {
				try { pstmt.close(); } catch( Throwable t ) { ; }
				pstmt = null;
			}
			
//			if( conn != null ) {
//				try { conn.close(); } catch( Throwable t ) { ; }
//				conn = null;
//			}
			
		}
		
	}
}
