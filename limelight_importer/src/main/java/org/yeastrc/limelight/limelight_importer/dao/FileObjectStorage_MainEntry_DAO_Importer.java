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
import org.yeastrc.limelight.limelight_shared.dto.FileObjectStorage_MainEntry_DTO;

/**
 * table file_object_storage_main_entry_tbl
 *
 */
public class FileObjectStorage_MainEntry_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( FileObjectStorage_MainEntry_DAO_Importer.class );
	
	private FileObjectStorage_MainEntry_DAO_Importer() { }
	public static FileObjectStorage_MainEntry_DAO_Importer getInstance() { return new FileObjectStorage_MainEntry_DAO_Importer(); }
	

	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	

	/**
	 * @param id
	 * @throws Exception
	 */
	public FileObjectStorage_MainEntry_DTO getForId( int id ) throws Exception {

		FileObjectStorage_MainEntry_DTO result = null;
		
		final String sql = "SELECT * FROM file_object_storage_main_entry_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = new FileObjectStorage_MainEntry_DTO();
						result.setId( rs.getInt( "id" ) );
						result.setFileObjectStorageStorageAPIKey( rs.getString( "file_object_storage_api_key" ) );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	/**
	 * Get the id for the supplied file_object_storage_api_key from the database. 
	 * @param file_object_storage_api_key
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer get_Id_For_FileObjectStorageStorageAPIKey( String file_object_storage_api_key ) throws Exception {
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			return getScanFileIdForSpectralStorageAPIKey( file_object_storage_api_key, dbConnection );
		}
	}

	/**
	 * Get the id for the supplied spectral_storage_api_key from the database. 
	 * @param sequence
	 * @return null if not found
	 * @throws Exception
	 */
	public Integer getScanFileIdForSpectralStorageAPIKey( String file_object_storage_api_key, Connection dbConnection ) throws Exception {
		
		Integer id = null;
		
		final String sql = "SELECT id FROM file_object_storage_main_entry_tbl WHERE file_object_storage_api_key = ? ORDER BY id LIMIT 1";
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {
			pstmt.setString( 1, file_object_storage_api_key );

			try ( ResultSet rs = pstmt.executeQuery() ) {
				if( rs.next() ) {
					id = rs.getInt( 1 );
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: get_Id_For_FileObjectStorageStorageAPIKey(...) sql: " + sql, e );
			throw e;
		}
		
		return id;
	}


	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_MainEntry_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, skipLogInsertException, dbConnection );
		} catch ( Exception e ) {
			log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO file_object_storage_main_entry_tbl "
			+ "( file_object_storage_api_key, file_type_id ) "
					
			+ "VALUES (?, ?)";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( FileObjectStorage_MainEntry_DTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {
			int counter = 0;
			counter++;
			pstmt.setString( counter, item.getFileObjectStorageStorageAPIKey() );
			counter++;
			pstmt.setInt( counter, item.getFileTypeId() );
			pstmt.executeUpdate();

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert for " + item.getFileObjectStorageStorageAPIKey() );
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
//		final String sql = "DELETE FROM file_object_storage_main_entry_tbl WHERE id = ?";
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
	
}
