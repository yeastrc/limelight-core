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
import java.sql.Statement;

import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.yeastrc.limelight.limelight_shared.dto.StructureFile_Like_PDB_File_DTO;
import org.yeastrc.limelight.limelight_shared.enum_classes.StructureFile_Like_PDB_File_FileType_Enum;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table structure_file_like_pdb_tbl
 *
 */
@Service
public class StructureFile_Like_PDB_File_DAO extends Limelight_JDBC_Base implements StructureFile_Like_PDB_File_DAO_IF {

	private static final Logger log = LoggerFactory.getLogger( StructureFile_Like_PDB_File_DAO.class );
	
	/**
	 * 
	 *
	 */
	public enum SkipLogInsertException { YES, NO }
	

	/**
	 * @param id
	 * @throws Exception
	 */
	
	@Override
	public Integer get_ProjectId_ForId( int id ) throws Exception {

		Integer result = null;

		final String sql = "SELECT project_id FROM structure_file_like_pdb_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setInt( 1, id );
			preparedStatement.executeQuery();

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getInt( "project_id" );
				}
			}

		} catch ( Exception e ) {
			log.error( "ERROR: get_ProjectId_ForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	/**
	 * @param id
	 * @throws Exception
	 */
	
	@Override
	public StructureFile_Like_PDB_File_DTO getForId( int id ) throws Exception {

		StructureFile_Like_PDB_File_DTO result = null;

		final String sql = "SELECT * FROM structure_file_like_pdb_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setInt( 1, id );
			preparedStatement.executeQuery();

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = getFromResultSet(rs);
				}
			}

		} catch ( Exception e ) {
			log.error( "ERROR: getForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	/**
	 * 
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	
	public static StructureFile_Like_PDB_File_DTO getFromResultSet( ResultSet rs ) throws SQLException {
		
		StructureFile_Like_PDB_File_DTO result = new StructureFile_Like_PDB_File_DTO();
		result.setId( rs.getInt( "id" ) );
		result.setProjectId( rs.getInt( "project_id" ) );
		result.setFileObjectStorage_MainEntryId( rs.getInt( "file_object_storage_main_entry_id_fk" ) );
		
		result.setName( rs.getString( "name" ) );
		{
			int value = rs.getInt( "file_type_id" );
			result.setFileType_Enum( StructureFile_Like_PDB_File_FileType_Enum.fromValue( value ) );
		}
		result.setFileSize( rs.getLong( "file_size" ) );
		
		result.setDescription( rs.getString( "description" ) );
		
		result.setStructureFile_Chains_Id_Label_Auth_Json_Blob( rs.getString( "structure_file_chains_id_label_auth_json_blob" ) );
	
		result.setCreated_DateTime( rs.getDate( "create_date_time" ) );
		result.setUserId_Created( rs.getInt( "user_id_created" ) );
				
		return result;
	}
	
	/////////////
	
	/**
	 * 
	 * Result of method get_project_id_AND_file_object_storage_main_entry_id_fk_ForId
	 *
	 */
	public static class StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId {
		

		private int projectId;
		private int fileObjectStorage_MainEntryId;
		
		public int getProjectId() {
			return projectId;
		}
		public int getFileObjectStorage_MainEntryId() {
			return fileObjectStorage_MainEntryId;
		}
	}
	

	/**
	 * @param id
	 * @throws Exception
	 */
	@Override
	public StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId get_project_id_AND_file_object_storage_main_entry_id_fk_ForId( int id ) throws Exception {

		StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId result = null;

		final String sql = "SELECT project_id, file_object_storage_main_entry_id_fk FROM structure_file_like_pdb_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setInt( 1, id );
			preparedStatement.executeQuery();

			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = new StructureFile_Like_PDB_File_DAO__Get_project_id_AND_file_object_storage_main_entry_id_fk_ForId();
					result.projectId = rs.getInt( "project_id" );
					result.fileObjectStorage_MainEntryId = rs.getInt( "file_object_storage_main_entry_id_fk" );
				}
			}

		} catch ( Exception e ) {
			log.error( "ERROR: get_project_id_AND_file_object_storage_main_entry_id_fk_ForId(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
		return result;
	}
	
	

	/////////////
	
	private final static String INSERT_SQL = 
			
			"INSERT INTO structure_file_like_pdb_tbl "
			+ "( "
			+ " project_id, file_object_storage_main_entry_id_fk, "
			+ " name, file_type_id, file_size, description, "
			+ " structure_file_chains_id_label_auth_json_blob, "
			+ " user_id_created "
			+ ") "
					
			+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

	/**
	 * @param item
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional(  propagation = Propagation.MANDATORY)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions

	public void saveToDatabase( StructureFile_Like_PDB_File_DTO item, SkipLogInsertException skipLogInsertException ) {

		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setInt( counter, item.getFileObjectStorage_MainEntryId() );
							counter++;
							pstmt.setString( counter, item.getName() );
							counter++;
							pstmt.setInt( counter, item.getFileType_Enum().value() );
							counter++;
							pstmt.setLong( counter, item.getFileSize() );
							counter++;
							pstmt.setString( counter, item.getDescription() );
							counter++;
							pstmt.setString( counter, item.getStructureFile_Chains_Id_Label_Auth_Json_Blob() );
							counter++;
							pstmt.setInt( counter, item.getUserId_Created() );
							
							return pstmt;
						}
					},
					keyHolder);

			Number insertedKey = keyHolder.getKey();
			
			long insertedKeyLong = insertedKey.longValue();
			
			if ( insertedKeyLong > Integer.MAX_VALUE ) {
				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
				log.error( msg );
				throw new LimelightInternalErrorException( msg );
			}
			
			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( RuntimeException e ) {
			String msg = "saveToDatabase(...) item: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}


	/**
	 * @param description
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateDescription( String description, int id ) {
		
		final String UPDATE_SQL = "UPDATE structure_file_like_pdb_tbl SET description = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, description );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "description: " + description + ", id: " + id + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 * @throws Exception
	 */
	@Override
	public void delete( int id ) throws Exception {

		final String sql = "DELETE FROM structure_file_like_pdb_tbl WHERE id = ?";

		try ( Connection dbConnection = super.getDBConnection();
				PreparedStatement preparedStatement = dbConnection.prepareStatement( sql ) ) {

			preparedStatement.setInt( 1, id );
			preparedStatement.executeUpdate();

		} catch ( Exception e ) {
			log.error( "ERROR: delete(...) id: " + id + ", sql: " + sql, e );
			throw e;
		}
	}
	
}
