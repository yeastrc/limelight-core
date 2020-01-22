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
import org.yeastrc.limelight.limelight_webapp.db_dto.DataPageSavedViewDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table data_page_saved_view_tbl
 *
 */
@Component
public class DataPageSavedViewDAO extends Limelight_JDBC_Base implements DataPageSavedViewDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( DataPageSavedViewDAO.class );

	/**
	 * Return the smallest id in the database for the url
	 * 
	 * @param url
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public Integer getFirstIdByURL( String url ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT id FROM data_page_saved_view_tbl WHERE url_start_at_page_controller_path = ? ORDER BY id LIMIT 1";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setString( 1, url );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "id" );
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
	 * Return the numeric fields for id
	 * 
	 * @param id
	 * @return null if not found, only the numeric fields
	 * @throws SQLException
	 */
	@Override
	public DataPageSavedViewDTO getNumericFieldsById( int id ) throws SQLException {
		
		DataPageSavedViewDTO result = null;
		
		final String querySQL = "SELECT project_id, single_project_search_id__default_view, user_id_created_record, user_id_last_updated_record FROM data_page_saved_view_tbl WHERE id = ? ";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = new DataPageSavedViewDTO();
					result.setId( id );
					result.setProjectId( rs.getInt( "project_id" ) );
					int singleProjectSearchIdDefaultView = rs.getInt( "single_project_search_id__default_view" );
					if ( ! rs.wasNull() ) {
						result.setSingleProjectSearchIdDefaultView( singleProjectSearchIdDefaultView );
					}
					result.setUserIdCreated( rs.getInt( "user_id_created_record" ) );
					result.setUserIdLastUpdated(rs.getInt( "user_id_last_updated_record" )  );
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
	 * Return the label for id
	 * 
	 * @param id
	 * @return null if not found or field is null
	 * @throws SQLException
	 */
	@Override
	public String getLabelById( int id ) throws SQLException {
		
		String result = null;
		
		final String querySQL = "SELECT label FROM data_page_saved_view_tbl WHERE id = ? ";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "label" );
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
	 * Return the single_project_search_id__default_view for id
	 * 
	 * @param id
	 * @return null if not found or field is null
	 * @throws SQLException
	 */
	@Override
	public Integer get_SingleProjectSearchIdDefaultView_ById( int id ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT single_project_search_id__default_view FROM data_page_saved_view_tbl WHERE id = ? ";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					int projectSearchId = rs.getInt( "single_project_search_id__default_view" );
					if ( ! rs.wasNull() ) {
						result = projectSearchId;
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
	
	
	private static final String getURL_ByProjectSearchIdControllerPath_SQL =
			"SELECT url_start_at_page_controller_path FROM data_page_saved_view_tbl "
			+ " WHERE "
			+ " single_project_search_id__default_view = ? "
			+ " AND"
			+ " page_controller_path = ? ";

	/**
	 * Return the URL for project search id and controller path
	 * 
	 * @param projectSearchId
	 * @return null if not found
	 * @throws SQLException
	 */
	@Override
	public String getURL_ByProjectSearchIdControllerPath( int projectSearchId, String controllerPath ) throws SQLException {
		
		String result = null;
		
		final String querySQL = getURL_ByProjectSearchIdControllerPath_SQL;
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, projectSearchId );
			preparedStatement.setString( 2, controllerPath );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getString( "url_start_at_page_controller_path" );
				}
				if ( rs.next() ) {
					String msg = "Found > 1 record for projectSearchId: " + projectSearchId 
							+ ", controllerPath: " + controllerPath;
					log.error( msg );
					throw new LimelightInternalErrorException( msg );
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
	

	
	///////
	
	private static final String INSERT_SQL = 
			"INSERT INTO data_page_saved_view_tbl "
			+ " ( project_id, page_controller_path, "
			+ " experiment_id, experiment_id_default_view, "
			+ " single_project_search_id__default_view,"
			+ " label, url_start_at_page_controller_path, srch_data_lkp_params_string,"
			+ " user_id_created_record, user_id_last_updated_record ) "
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( DataPageSavedViewDTO item ) {
		
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
							pstmt.setInt( counter, item.getProjectId() );
							counter++;
							pstmt.setString( counter, item.getPageControllerPath() );
							counter++;
							if ( item.getExperimentId() != null ) {
								pstmt.setInt( counter, item.getExperimentId() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							if ( item.getExperimentIdDefaultView() != null ) {
								pstmt.setInt( counter, item.getExperimentIdDefaultView() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							if ( item.getSingleProjectSearchIdDefaultView() != null ) {
								pstmt.setInt( counter, item.getSingleProjectSearchIdDefaultView() );
							} else {
								pstmt.setNull( counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getLabel() );
							counter++;
							pstmt.setString( counter, item.getUrlStartAtPageControllerPath() );
							counter++;
							pstmt.setString( counter, item.getSearchDataLookupParamsString() );
							counter++;
							pstmt.setInt( counter, item.getUserIdCreated() );
							counter++;
							pstmt.setInt( counter, item.getUserIdLastUpdated() );

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
	 * @param label
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateLabel( String label, int userId, int id ) {
		
		final String UPDATE_SQL = "UPDATE data_page_saved_view_tbl SET label = ? WHERE id = ?";
		
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
							pstmt.setString( counter, label );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "label: " + label + ", id: " + id + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param projectSearchId
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void updateSingleProjectSearchIdDefaultView( int projectSearchId, int userId, int id ) {
		
		final String UPDATE_SQL = "UPDATE data_page_saved_view_tbl SET single_project_search_id__default_view = ? WHERE id = ?";
		
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
							pstmt.setInt( counter, projectSearchId );
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectSearchId: " + projectSearchId + ", id: " + id + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}
	
	private static final String clearAllSingleProjectSearchIdDefaultView_ForProjectSearchId_SQL =
			"UPDATE data_page_saved_view_tbl "
			+ "SET single_project_search_id__default_view = null "
			+ "WHERE "
			+ " single_project_search_id__default_view = ? "
			+ " AND"
			+ " page_controller_path = ? ";
	/**
	 * @param projectSearchId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void clearAllSingleProjectSearchIdDefaultView_ForProjectSearchId( int projectSearchId, String pageControllerPath ) {
		
		final String UPDATE_SQL = clearAllSingleProjectSearchIdDefaultView_ForProjectSearchId_SQL;
		
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
							pstmt.setInt( counter, projectSearchId );
							counter++;
							pstmt.setString( counter, pageControllerPath );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "projectSearchId: " + projectSearchId + ", SQL: " + UPDATE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void delete( int id ) {
		
		final String DELETE_SQL = "DELETE FROM data_page_saved_view_tbl WHERE id = ?";
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
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

	//  DELETE JOIN 'USING' from MySQL Docs
	
	private static final String deleteForProjectSearchId_SQL =
			"DELETE FROM data_page_saved_view_tbl "
			+ " USING data_page_saved_view_tbl "
			+ " INNER JOIN data_page_saved_view_assoc_project_search_id_tbl AS assoc_prj_tbl"
			+   " ON  data_page_saved_view_tbl.id = assoc_prj_tbl.assoc_main_id "
			+ "WHERE assoc_prj_tbl.project_search_id = ?";
	/**
	 * Delete all records that have join record in data_page_saved_view_assoc_project_search_id_tbl with project_search_id = ?
	 * @param projectSearchId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	public void deleteForProjectSearchId( int projectSearchId ) {
		
		final String DELETE_SQL = deleteForProjectSearchId_SQL;
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt = connection.prepareStatement( DELETE_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, projectSearchId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + projectSearchId + ", SQL: " + DELETE_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
