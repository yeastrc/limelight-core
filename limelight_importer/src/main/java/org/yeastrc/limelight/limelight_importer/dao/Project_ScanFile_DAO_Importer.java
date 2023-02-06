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
import java.sql.SQLException;
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_importer_runimporter_shared.db.ImportRunImporterDBConnectionFactory;
import org.yeastrc.limelight.limelight_importer.exceptions.LimelightImporterDatabaseException;
import org.yeastrc.limelight.limelight_shared.dto.Project_ScanFile_DTO;

/**
 * table project_scan_file_tbl
 *
 */
public class Project_ScanFile_DAO_Importer {

	private static final Logger log = LoggerFactory.getLogger( Project_ScanFile_DAO_Importer.class );
	
	private Project_ScanFile_DAO_Importer() { }
	public static Project_ScanFile_DAO_Importer getInstance() { return new Project_ScanFile_DAO_Importer(); }
	

	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Project_ScanFile_DTO item, SkipLogInsertException skipLogInsertException ) throws Exception {

		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {
			saveToDatabase( item, skipLogInsertException, dbConnection );
		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase( item ) item: " + item, e );
			}
			throw e;
		}
	}

	private final static String INSERT_SQL = 
			
			"INSERT INTO project_scan_file_tbl ( project_id, scan_file_id ) "
					+ "VALUES ( ?, ? )";
	
	/**
	 * @param item
	 * @throws Exception
	 */
	public void saveToDatabase( Project_ScanFile_DTO item, SkipLogInsertException skipLogInsertException, Connection dbConnection ) throws Exception {
		
		final String sql = INSERT_SQL;
		
		try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS ) ) {

			int counter = 0;

			counter++;
			pstmt.setInt( counter, item.getProjectId() );
			counter++;
			pstmt.setInt( counter, item.getScanFileId() );
			
			pstmt.executeUpdate();

			try ( ResultSet rs = pstmt.getGeneratedKeys() ) {
				if( rs.next() ) {
					item.setId( rs.getInt( 1 ) );
				} else
					throw new LimelightImporterDatabaseException( "Failed to insert ..." );
			}
		} catch ( Exception e ) {
			if ( skipLogInsertException == null || skipLogInsertException != SkipLogInsertException.YES ) {
				log.error( "ERROR: saveToDatabase(...) item: " + item + ", sql: " + sql, e );
			}
			throw e;
		}
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	public void delete( int id ) throws Exception {

		final String sql = "DELETE FROM project_scan_file_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeUpdate();
			}
		} catch ( Exception e ) {
			log.error( "ERROR: delete(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	public Project_ScanFile_DTO getForId( int id ) throws Exception {

		Project_ScanFile_DTO result = null;
		
		final String sql = "SELECT * FROM project_scan_file_tbl WHERE id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				pstmt.setInt( 1, id );
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						result = get_FromResultSet(rs);
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
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	private Project_ScanFile_DTO get_FromResultSet( ResultSet rs ) throws SQLException {
		Project_ScanFile_DTO result = new Project_ScanFile_DTO();
		result.setId( rs.getInt( "id" ) );
		result.setProjectId( rs.getInt( "project_id" ) );
		result.setScanFileId( rs.getInt( "scan_file_id" ) );

		return result;
	}
	

	/**
	 * @param item
	 * @throws Exception
	 */
	public Integer getId_ForItem( Project_ScanFile_DTO item ) throws Exception {

		Integer id= null;
		
		final String sql = "SELECT id FROM project_scan_file_tbl WHERE project_id = ? AND scan_file_id = ?";
		
		try ( Connection dbConnection = ImportRunImporterDBConnectionFactory.getMainSingletonInstance().getConnection() ) {

			try ( PreparedStatement pstmt = dbConnection.prepareStatement( sql ) ) {

				int counter = 0;

				counter++;
				pstmt.setInt( counter, item.getProjectId() );
				counter++;
				pstmt.setInt( counter, item.getScanFileId() );
				
				pstmt.executeQuery();

				try ( ResultSet rs = pstmt.executeQuery() ) {
					if( rs.next() ) {
						id = rs.getInt( "id" );
					}
				}
			}
		} catch ( Exception e ) {
			log.error( "ERROR: getId_ForItem(...) item: " + item + ", sql: " + sql, e );
			throw e;
		}
		return id;
	}
	
	
}
