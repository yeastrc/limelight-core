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
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.ProjectDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table project_tbl
 *
 */
@Component
public class ProjectDAO extends Limelight_JDBC_Base implements ProjectDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( ProjectDAO.class );

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF#getTitleForId(int)
	 */
	@Override
	public ProjectDTO get_Title_ProjectLocked_ForId( int id ) throws SQLException {
		
		ProjectDTO result = null;
		
		final String querySQL = "SELECT title, project_locked FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new ProjectDTO();
					result.setId( id );
					result.setTitle( rs.getString( "title" ) );
					{
						int fieldIntValue = rs.getInt( "project_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setProjectLocked( true );
						}
					}
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

	/**
	 * !!  Only populates title, abstract, project_locked, public_access_level, marked_for_deletion
	 * 
	 * @param id
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public ProjectDTO getPartialForProjectPageForId( int id ) throws SQLException {
		
		ProjectDTO result = null;
		
		final String querySQL = 
				"SELECT title, abstract, project_locked, public_access_level "
				+ " FROM project_tbl "
				+ " WHERE id = ?"
				+ " AND marked_for_deletion != " + Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new ProjectDTO();
					result.setId( id );
					result.setTitle( rs.getString( "title" ) );
					result.setAbstractText( rs.getString( "abstract" ) );
					{
						int fieldIntValue = rs.getInt( "project_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							result.setProjectLocked( true );
						}
					}
					int publicAccessLevel = rs.getInt( "public_access_level" );
					if ( ! rs.wasNull() ) {
						result.setPublicAccessLevel( publicAccessLevel );
					}
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

	/**
	 * !!!  Only populates properties projectLocked, publicAccessLevel, public_access_locked, enabled, markedForDeletion,
	 * 
	 * @param projectId
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public ProjectDTO getProjectLockedPublicAccessLevelPublicAccessLockedForProjectId( int projectId ) throws SQLException {
		
		ProjectDTO returnItem = null;
		
		final String querySQL = "SELECT project_locked, public_access_level, public_access_locked, enabled, marked_for_deletion FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = new ProjectDTO();
					returnItem.setId( projectId );
					{
						int fieldIntValue = rs.getInt( "project_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setProjectLocked( true );
						}
					}
					{
						int publicAccessLevel = rs.getInt( "public_access_level" );
						if (rs.wasNull()) {
							returnItem.setPublicAccessLevel( null );
						} else {
							returnItem.setPublicAccessLevel( publicAccessLevel );
						}
					}
					{
						int fieldIntValue = rs.getInt( "public_access_locked" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setPublicAccessLocked( true );
						}
					}
					{
						int fieldIntValue = rs.getInt( "enabled" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setEnabled( true );
						}
					}
					{
						int fieldIntValue = rs.getInt( "marked_for_deletion" );
						if ( fieldIntValue == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setMarkedForDeletion( true );
						}
					}
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select subset, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/**
	 * !!!  Only populates properties PublicAccessCode, PublicAccessCodeEnabled
	 * 
	 * @param projectId
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public ProjectDTO getPublicAccessCodePublicAccessCodeEnabledForProjectId( int projectId ) throws SQLException {
		
		ProjectDTO returnItem = null;
		
		final String querySQL = "SELECT public_access_code, public_access_code_enabled FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectId );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					returnItem = new ProjectDTO();
					returnItem.setId( projectId );
					returnItem.setPublicAccessCode( rs.getString( "public_access_code" ) );
					{
						int publicAccessCodeEnabled_Int = rs.getInt( "public_access_code_enabled" );
						if ( publicAccessCodeEnabled_Int == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							returnItem.setPublicAccessCodeEnabled( true );
						} else {
							returnItem.setPublicAccessCodeEnabled( false );
						}
					}
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select subset, projectId: " + projectId + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return returnItem;
	}

	/**
	 * @param projectId
	 * @return null if not found
	 * @throws Exception
	 */
	@Override
	public String get_ShortName_ForId( int id ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT short_name FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if( rs.next() ) {
					result = rs.getString( "short_name" );
				}
			}
		} catch ( Exception e ) {
			String msg = "Failed to select subset, id: " + id + ", sql: " + querySQL;
			log.error( msg, e );
			throw e;
		}
		return result;
	}
	
	/**
	 * @param item
	 */
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	@Override
	
	public void save( ProjectDTO item ) {
		
		//  Generate next id value for insert into main table using table ...insert_id_tbl
		
		//  Get id for new record to insert using table project__insert_id_tbl
		int id = save_InsertGetInsertId();
		
		//  delete all records in 
		deleteLessThanId( id );
		
		item.setId( id );
		
		//  Insert into main table
		
		save_MainInsert(item);
		
	}


	/**
	 * Insert into 'side' table to get next auto increment value to use as 'id' on main insert
	 */
	private int save_InsertGetInsertId() {
		
		final String INSERT_SQL = "INSERT INTO project__insert_id_tbl (  ) VALUES ( )";
		
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
			
			int insertedKeyInt = (int) insertedKeyLong; // Inserted auto-increment primary key for the inserted record
			
			return insertedKeyInt;
			
		} catch ( RuntimeException e ) {
			String msg = "SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * Only call from Transaction service
	 * 
	 * @param id
	 */
	private void deleteLessThanId( int id ) {
		
		final String DELETE_SQL = "DELETE FROM project__insert_id_tbl WHERE id < ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( DELETE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}


	/**
	 * @param item
	 */
	private void save_MainInsert( ProjectDTO item ) {
		
		final String INSERT_SQL = "INSERT INTO project_tbl ( id, title, abstract, created_by_user_id, updated_by_user_id ) VALUES ( ?, ?, ?, ?, ? )";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
//			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL
//											, Statement.RETURN_GENERATED_KEYS 
											);
							int counter = 0;
							counter++;
							pstmt.setInt( counter, item.getId() );
							counter++;
							pstmt.setString( counter, item.getTitle() );
							counter++;
							pstmt.setString( counter, item.getAbstractText() );
							counter++;
							pstmt.setInt( counter, item.getCreatedByUserId() );
							counter++;
							pstmt.setInt( counter, item.getUpdatedByUserId() );

							return pstmt;
						}
					}
//					,
//					keyHolder
					);

//			Number insertedKey = keyHolder.getKey();
//			
//			long insertedKeyLong = insertedKey.longValue();
//			
//			if ( insertedKeyLong > Integer.MAX_VALUE ) {
//				String msg = "Inserted key is too large, is > Integer.MAX_VALUE. insertedKey: " + insertedKey;
//				log.error( msg );
//				throw new LimelightInternalErrorException( msg );
//			}
//			
//			item.setId( (int) insertedKeyLong ); // Inserted auto-increment primary key for the inserted record
			
		} catch ( RuntimeException e ) {
			String msg = "ProjectDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param title
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateTitle( String title, int projectId, int userId ) {
		
		final String INSERT_SQL = "UPDATE project_tbl SET title = ?, updated_by_user_id = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, title );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "title: " + title + ", projectId: " + projectId + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param projectAbstract
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateAbstract( String projectAbstract, int projectId, int userId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET abstract = ?, updated_by_user_id = ? WHERE id = ?";
		
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
							pstmt.setString( counter, projectAbstract );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectAbstract: " + projectAbstract + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param markedForDeletion
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateMarkedForDeletion( boolean markedForDeletion, int projectId, int userId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET marked_for_deletion = ?, marked_for_deletion_timestamp = NOW(), marked_for_deletion_user_id = ?, updated_by_user_id = ? WHERE id = ?";

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
							if ( markedForDeletion ){
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectLocked: " + markedForDeletion + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param projectLocked
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateProjectLocked( boolean projectLocked, int projectId, int userId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET project_locked = ?, updated_by_user_id = ? WHERE id = ?";
		
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
							if ( projectLocked ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );	
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectLocked: " + projectLocked + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param publicAccessLevel
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updatePublicAccessLevel( Integer publicAccessLevel, int projectId, int userId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET public_access_level = ?, updated_by_user_id = ? WHERE id = ?";
		
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
							if ( publicAccessLevel != null ) {
								pstmt.setInt( counter, publicAccessLevel );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "publicAccessLevel: " + publicAccessLevel + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param publicAccessCode - null if not updated
	 * @param publicAccessCodeEnabled - null if not updated
	 * @param projectId
	 */
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updatePublicAccessCodePublicAccessCodeEnabled( String publicAccessCode, Boolean publicAccessCodeEnabled, int projectId, int userId ) {
		
		if ( publicAccessCode == null && publicAccessCodeEnabled == null ) {
			throw new IllegalArgumentException( "publicAccessCode is null and publicAccessCodeEnabled is null");
		}

		String sql = "UPDATE project_tbl SET ";
		if ( publicAccessCode != null ) {
			sql += " public_access_code = ? ";
		}
		if ( publicAccessCodeEnabled != null ) {
			if ( publicAccessCode != null ) {
				sql += " , ";
			}	
			sql += " public_access_code_enabled = ? ";
		}
		
		sql += ", updated_by_user_id = ? WHERE id = ?";
		
		final String sqlFinal = sql;
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sqlFinal );
							int counter = 0;
							if ( publicAccessCode != null ) {
								counter++;
								pstmt.setString( counter, publicAccessCode );
							}
							if ( publicAccessCodeEnabled != null ) {
								counter++;
								if ( publicAccessCodeEnabled ) {
									pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );	
								} else {
									pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
								}
							}
							
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "publicAccessCode: " + publicAccessCode + ", publicAccessCodeEnabled: " + publicAccessCodeEnabled + ", projectId: " + projectId + ", SQL: " + sql;
			log.error( msg, e );
			throw e;
		}
	}


	/**
	 * @param shortName
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateShortName( String shortName, int projectId, int userId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET short_name = ?, updated_by_user_id = ? WHERE id = ?";
		
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
							pstmt.setString( counter, shortName );
							counter++;
							pstmt.setInt( counter, userId );
							counter++;
							pstmt.setInt( counter, projectId );

							return pstmt;
						}
					});

		} catch ( org.springframework.dao.DuplicateKeyException e ) {
			String msg = "org.springframework.dao.DuplicateKeyException:  shortName: " + shortName + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.warn( msg );
			throw e;
			
		} catch ( RuntimeException e ) {
			String msg = "shortName: " + shortName + ", projectId: " + projectId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}
}
