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
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterInternalException;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.PsmDTO;

/**
 * table psm_tbl
 *
 */
public class DB_Insert_PsmDAO {

	private static final Logger log = LoggerFactory.getLogger( DB_Insert_PsmDAO.class );
	
	private static DB_Insert_PsmDAO singletonInstance = new DB_Insert_PsmDAO();

	private DB_Insert_PsmDAO() { }
	public static DB_Insert_PsmDAO getSingletonInstance() { return singletonInstance; }
	
	private boolean initializeCalled = false;
	
	private int psmCount_ForSearch;
	
	private long next_PsmId;
	
	private long psmId_InsertMax;
	
	/**
	 * @param psmCount_ForSearch
	 * @throws Exception 
	 */
	public void initialize_Pass_PsmCount(int psmCount_ForSearch) throws Exception {
		
		this.psmCount_ForSearch = psmCount_ForSearch;
		
		this.initialize__Internal();  //  Code at bottom of class
		
		initializeCalled = true;
	}


	/**
	 * @param item
	 * @return
	 * @throws Throwable
	 */
	public void saveToDatabase(PsmDTO item ) throws Exception {

		try {
			if ( ! initializeCalled ) {
				String msg = "saveToDatabase(...) called before initialize_Pass_PsmCount(...) called";
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
			
			if ( this.psmCount_ForSearch == 0 ) {
				String msg = "saveToDatabase(...) called when initialize_Pass_PsmCount(...) called with psmCount_ForSearch == 0";
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}

			//  DO NOT Close connection from getInsertControlCommitConnection()
			Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getInsertControlCommitConnection();

			//  Generate next id value for insert into main table using table ...insert_id_tbl
			
//			//  Get id for new record to insert using table project_search__insert_id_tbl
//			long id = save_InsertGetInsertId( dbConnection );
//			
//			//  delete all records in 
//			deleteLessThanId( id, dbConnection );
			
			long id = next_PsmId;
			
			if ( id > psmId_InsertMax ) {
				String msg = "saveToDatabase(...): Computation Error computing psmId_InsertMax.  ( id > psmId_InsertMax ). id: " + id + ", psmId_InsertMax: " + psmId_InsertMax;
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}
			
			next_PsmId++;
			
			item.setId( id );
			
			//  Insert into main table
			saveToDatabase( item, dbConnection );
			
		} finally {
		}
	}
	
	/////

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
	
//	
//	/**
//	 * Insert into 'side' table to get next auto increment value to use as 'id' on main insert
//	 * @throws Exception 
//	 */
//	private long save_InsertGetInsertId( Connection conn ) throws Exception {
//		
//		final String INSERT_GET_ID_SQL = "INSERT INTO psm__insert_id_tbl (  ) VALUES ( )";
//		
//		//  How to get the auto-increment primary key for the inserted record
//		PreparedStatement pstmt = null;
//		ResultSet rs = null;
//		String sql = INSERT_GET_ID_SQL;
//		try {
//			pstmt = conn.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
//
//			pstmt.executeUpdate();
//			rs = pstmt.getGeneratedKeys();
//			if( rs.next() ) {
//				long id =  rs.getInt( 1 );
//				
//				return id;
//			} else
//				throw new LimelightImporterDatabaseException( "Failed to insert psm__insert_id_tbl " );
//		} catch ( Exception e ) {
//			log.error( "ERROR: save_InsertGetInsertId(...) sql: " + sql, e );
//			throw e;
//		} finally {
//			// be sure database handles are closed
//			if( rs != null ) {
//				try { rs.close(); } catch( Throwable t ) { ; }
//				rs = null;
//			}
//			if( pstmt != null ) {
//				try { pstmt.close(); } catch( Throwable t ) { ; }
//				pstmt = null;
//			}
////			if( conn != null ) {
////				try { conn.close(); } catch( Throwable t ) { ; }
////				conn = null;
////			}
//		}
//	}
//
//	/**
//	 * 
//	 * 
//	 * @param id
//	 * @throws Exception 
//	 */
//	private void deleteLessThanId( long id, Connection conn ) throws Exception {
//		
//		final String DELETE_SQL = "DELETE FROM psm__insert_id_tbl WHERE id < ?";
//		PreparedStatement pstmt = null;
//		ResultSet rs = null;
//		String sql = DELETE_SQL;
//		try {
//			pstmt = conn.prepareStatement( sql );
//			int counter = 0;
//			counter++;
//			pstmt.setLong( counter, id );
//
//			pstmt.executeUpdate();
//			
//		} catch ( Exception e ) {
//			log.error( "ERROR: deleteLessThanId(...) sql: " + sql, e );
//			throw e;
//		} finally {
//			// be sure database handles are closed
//			if( rs != null ) {
//				try { rs.close(); } catch( Throwable t ) { ; }
//				rs = null;
//			}
//			if( pstmt != null ) {
//				try { pstmt.close(); } catch( Throwable t ) { ; }
//				pstmt = null;
//			}
////			if( conn != null ) {
////				try { conn.close(); } catch( Throwable t ) { ; }
////				conn = null;
////			}
//		}
//	}
	
	///////////////////////////////////
	///////////////////////////////////
	
	///  Initialize
	
	/**
	 * @throws Exception 
	 * 
	 */
	private void initialize__Internal() throws Exception {
		
		boolean successful_Initialize = false;
		
		final int try_Count_Max = 10;
		
		int try_Counter = 0;
				
		while ( ! successful_Initialize ) {
			
			try_Counter++;
			
			if ( try_Counter > try_Count_Max ) {
				String msg = "initialize__Internal(): try_Counter > try_Count_Max. try_Count_Max: " + try_Count_Max;
				log.error(msg);
				throw new LimelightImporterInternalException(msg);
			}


			// get psm__insert_id_tbl and then 'advance' psm__insert_id_tbl by adding this.psmCount_ForSearch to it.

			Long psmId_LastInserted = get_MaxId_PsmInsertId_Table();

			if ( psmId_LastInserted == null ) {
				//  No entries in DB

				//  Insert zero into db

				try {
					insertId_Value_PsmInsertId_Table( 0 );
				} catch (Exception e) {
					//  Swallow Exception since may be duplicate
				}

				psmId_LastInserted = get_MaxId_PsmInsertId_Table();  // Run query again.  Another Importer may have inserted a different value

				if ( psmId_LastInserted == null ) {
					String msg = "No psmId_LastInserted after insert value zero.  Investigate error message for insertId_Value(...)";
					log.error(msg);
					throw new LimelightImporterDatabaseException(msg);
				}

				if ( psmId_LastInserted.longValue() != 0 ) {
					// There is now a value in the table that is not the zero entry just inserted so delete the zero entry

					deleteId_PsmInsertId_Table(0);
				}
			}

			//  Now have a value for psmId_LastInserted.  This may be updated by another
			
			long id_New = psmId_LastInserted + this.psmCount_ForSearch; // New "Last Inserted PSM Id"
			
			long id_Existing = psmId_LastInserted;

			if ( updateId_PsmInsertId_Table( id_New, id_Existing ) ) {
				
				successful_Initialize = true;
				
				this.next_PsmId = psmId_LastInserted + 1;
				
				psmId_InsertMax = psmId_LastInserted + this.psmCount_ForSearch; // New "Last Inserted PSM Id"
			}
			
			if ( ! successful_Initialize ) {
				Thread.sleep(1005);  // wait before retry
			}
		}
	}
	

	/**
	 * @return null when no record found
	 * @throws Exception
	 */
	private Long get_MaxId_PsmInsertId_Table() throws Exception {
		
		final String sql = "SELECT id FROM psm__insert_id_tbl ORDER BY id DESC LIMIT 1";
		
		Long psmId_LastInserted = null;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				
				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						psmId_LastInserted = rs.getLong( "id" );
					}
				}
			}
			
		} catch ( Exception e ) {
			log.error( "ERROR: get_MaxId(...) sql: " + sql, e );
			throw e;
		}
		
		return psmId_LastInserted;
	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private boolean updateId_PsmInsertId_Table( long id_New, long id_Existing ) throws Exception {
		
		boolean any_RecordsUpdated = false;
		
		final String sql = "UPDATE psm__insert_id_tbl SET id = ? WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setLong( 1, id_New );
				pstmt.setLong( 2, id_Existing );

				int updateCount = pstmt.executeUpdate();
				
				if ( updateCount > 0 ) {
					
					any_RecordsUpdated = true;
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: updateId_PsmInsertId_Table(id). id_New: " + id_New + ", id_Existing: " + id_Existing + ", sql: " + sql, e );
			throw e;
		}
		
		return any_RecordsUpdated;
	}
	
	/**
	 * Insert into 'side' table to insert zero when table is empty
	 * @throws Exception 
	 */
	private void insertId_Value_PsmInsertId_Table(long id) throws Exception {
		
		final String INSERT_GET_ID_SQL = "INSERT INTO psm__insert_id_tbl ( id ) VALUES ( ? )";
		final String sql = INSERT_GET_ID_SQL;
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setLong( 1, id );
				
				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "Exception Ignored since May be duplicate.  Logged in case there is a different error to research: insertId_Value(...): id: " + id + ", sql: " + sql, e );
			throw e;
		}

	}

	/**
	 * 
	 * 
	 * @param id
	 * @throws Exception 
	 */
	private void deleteId_PsmInsertId_Table( long id ) throws Exception {
		
		final String DELETE_SQL = "DELETE FROM psm__insert_id_tbl WHERE id = ?";
		final String sql = DELETE_SQL;
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
				pstmt.setLong( 1, id );

				int updateCount = pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: deleteId(id). id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	
}
