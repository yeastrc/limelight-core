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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.dto.ScanFileDTO;

/**
 * table scan_file_tbl
 *
 */
public class ScanFileDAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( ScanFileDAO_Importer.class );
	
	private ScanFileDAO_Importer() { }
	public static ScanFileDAO_Importer getInstance() { return new ScanFileDAO_Importer(); }
	

	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	
	
	/**
	 * Get the id for the supplied spectral_storage_api_key from the database. 
	 * @param spectral_storage_api_key
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getScanFileIdForSpectralStorageAPIKey( String sequence ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			return getScanFileIdForSpectralStorageAPIKey( sequence, dbConnection );
		}
	}

	/**
	 * Get the id for the supplied spectral_storage_api_key from the database. 
	 * @param sequence
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getScanFileIdForSpectralStorageAPIKey( String sequence, Connection dbConnection ) throws Exception {
		
		Integer id = null;
		
		final String sql = "SELECT id FROM scan_file_tbl WHERE spectral_storage_api_key = ? ORDER BY id LIMIT 1";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setString( 1, sequence );

			try ( ResultSet rs = pstmt.executeQuery() ) {
				if( rs.next() ) {
					id = rs.getInt( 1 );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getScanFileIdForSpectralStorageAPIKey(...) sql: " + sql, e );
			throw e;
		}
		
		return id;
	}


	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ScanFileDTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, skipLogInsertException, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO scan_file_tbl "
			+ "( spectral_storage_api_key ) "
					
			+ "VALUES (?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( ScanFileDTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			int counter = 0;
			counter++;
			pstmt.setString( counter, item.getSpectralStorageAPIKey() );
			pstmt.executeUpdate();

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert for " + item.getSpectralStorageAPIKey() );
			}
		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}
	
//	/**
//	 * @param id
//	 * @throws Exception
//	 */
//	public void delete( int id ) throws Exception {
//
//		final String sql = "DELETE FROM scan_file_tbl WHERE id = ?";
//		
//		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
//
//			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
//
//				pstmt.setInt( 1, id );
//				pstmt.executeUpdate();
//			}
//		} catch ( Exception e ) {
//			log.error( "ERROR: delete(...) id: " + id + ", sql: " + sql, e );
//			throw e;
//		}
//	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	public ScanFileDTO getForId( int id ) throws Exception {

		ScanFileDTO result = null;
		
		final String sql = "SELECT * FROM scan_file_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = new ScanFileDTO();
						result.setId( rs.getInt( "id" ) );
						result.setSpectralStorageAPIKey( rs.getString( "spectral_storage_api_key" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
}
