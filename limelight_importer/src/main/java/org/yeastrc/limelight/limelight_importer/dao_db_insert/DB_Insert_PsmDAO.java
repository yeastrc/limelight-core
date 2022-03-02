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
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;

/**
 * table psm_tbl
 *
 */
public class DB_Insert_PsmDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDAO.class );

	private DB_Insert_PsmDAO() { }
	public static DB_Insert_PsmDAO getInstance() { return new DB_Insert_PsmDAO(); }


	/**
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void saveToDatabase(PsmDTO item ) throws Exception {

		try {

			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();

			//  Generate next id value for insert into main table using table ...insert_id_tbl
			
			//  Get id for new record to insert using table project_search__insert_id_tbl
			long id = save_InsertGetInsertId( dbConnection );
			
			//  delete all records in 
			deleteLessThanId( id, dbConnection );
			
			item.setId( id );
			
			//  Insert into main table
			saveToDatabase( item, dbConnection );
			
		} finally {
		}
	}

	/**
	 * Insert into 'side' table to get next auto increment value to use as 'id' on main insert
	 * @throws Exception 
	 */
	private long save_InsertGetInsertId( Connection conn ) throws Exception {
		
		final String INSERT_GET_ID_SQL = "INSERT INTO psm__insert_id_tbl (  ) VALUES ( )";
		
		//  How to get the auto-increment primary key for the inserted record
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = INSERT_GET_ID_SQL;
		try {
			pstmt = conn.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );

			pstmt.executeUpdate();
			rs = pstmt.getGeneratedKeys();
			if( rs.next() ) {
				long id =  rs.getInt( 1 );
				
				return id;
			} else
				throw new LimelightImporterDatabaseException( "Failed to insert psm__insert_id_tbl " );
		} catch ( Exception e ) {
			log.error( "ERROR: save_InsertGetInsertId(...) sql: " + sql, e );
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

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private void deleteLessThanId( long id, Connection conn ) throws Exception {
		
		final String DELETE_SQL = "DELETE FROM psm__insert_id_tbl WHERE id < ?";
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String sql = DELETE_SQL;
		try {
			pstmt = conn.prepareStatement( sql );
			int counter = 0;
			counter++;
			pstmt.setLong( counter, id );

			pstmt.executeUpdate();
			
		} catch ( Exception e ) {
			log.error( "ERROR: deleteLessThanId(...) sql: " + sql, e );
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
	
	private static final String INSERT_SQL =
			
			"INSERT INTO psm_tbl "
			+ "( id, search_id, reported_peptide_id, charge, "
			+ " scan_number, search_scan_file_id, has_modifications, has_open_modifications, has_reporter_ions, "
			+ " precursor_retention_time, precursor_m_z ) "
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	
	/**
	 * @param psm
	 * @param conn
	 * @throws Exception
	 */
	public void saveToDatabase( PsmDTO psm, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		

		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			
			int counter = 0;
			
			counter++;
			pstmt.setLong( counter, psm.getId() );
			
			counter++;
			pstmt.setInt( counter, psm.getSearchId() );

			counter++;
			pstmt.setInt( counter, psm.getReportedPeptideId() );

			counter++;
			pstmt.setInt( counter, psm.getCharge() );

			counter++;
			pstmt.setInt( counter, psm.getScanNumber() );

			counter++;
			if ( psm.getSearchScanFileId()!= null ) {
				pstmt.setInt( counter, psm.getSearchScanFileId() );
			} else {
				pstmt.setNull( counter, java.sql.Types.INTEGER );
			}

			counter++;
			if ( psm.isHasModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			counter++;
			if ( psm.isHasOpenModifications() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}

			counter++;
			if ( psm.isHasReporterIons() ) {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
			} else {
				pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
			}
			
			counter++;
			pstmt.setBigDecimal( counter, psm.getPrecursor_RetentionTime() );
			counter++;
			pstmt.setBigDecimal( counter, psm.getPrecursor_MZ() );
			
			pstmt.executeUpdate();
			
			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					psm.setId( rs.getLong( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert psm..." );
			}
			
		} catch ( Exception e ) {
			
			log.error( "ERROR: saveToDatabase(...) sql: " + sql + "\nData to save: " + psm, e );
			
			throw e;
		}
	}
}
