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
					result.setProjectLocked( rs.getBoolean( "project_locked" ) );
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
	 * !!  Only populates title, abstract, project_locked, public_access_level
	 * 
	 * @param id
	 * @return
	 * @throws SQLException 
	 */
	@Override
	public ProjectDTO getPartialForProjectPageForId( int id ) throws SQLException {
		
		ProjectDTO result = null;
		
		final String querySQL = "SELECT title, abstract, project_locked, public_access_level FROM project_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new ProjectDTO();
					result.setId( id );
					result.setTitle( rs.getString( "title" ) );
					result.setAbstractText( rs.getString( "abstract" ) );
					result.setProjectLocked( rs.getBoolean( "project_locked" ) );
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
					returnItem.setProjectLocked( rs.getBoolean( "project_locked" ) );
					int publicAccessLevel = rs.getInt( "public_access_level" );
					if (rs.wasNull()) {
						returnItem.setPublicAccessLevel( null );
					} else {
						returnItem.setPublicAccessLevel( publicAccessLevel );
					}
					returnItem.setPublicAccessLocked( rs.getBoolean( "public_access_locked" ) );
					returnItem.setEnabled( rs.getBoolean( "enabled" ) );
					returnItem.setMarkedForDeletion( rs.getBoolean( "marked_for_deletion" ) );
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
		
		final String INSERT_SQL = "INSERT INTO project_tbl ( title, abstract ) VALUES ( ?, ? )";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							pstmt.setString( counter, item.getTitle() );
							counter++;
							pstmt.setString( counter, item.getAbstractText() );

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
	public void updateTitle( String title, int projectId ) {
		
		final String INSERT_SQL = "UPDATE project_tbl SET title = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( INSERT_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, title );
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
	public void updateAbstract( String projectAbstract, int projectId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET abstract = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, projectAbstract );
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
	 * @param projectLocked
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateProjectLocked( boolean projectLocked, int projectId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET project_locked = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setBoolean( counter, projectLocked );
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
	public void updatePublicAccessLevel( Integer publicAccessLevel, int projectId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET public_access_level = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
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
	 * @param shortName
	 * @param projectId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateShortName( String shortName, int projectId ) {
		
		final String UPDATE_SQL = "UPDATE project_tbl SET short_name = ? WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_SQL );
							int counter = 0;
							counter++;
							pstmt.setString( counter, shortName );
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
