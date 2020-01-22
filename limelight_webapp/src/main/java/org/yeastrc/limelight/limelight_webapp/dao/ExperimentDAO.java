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
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightDatabaseException;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table experiment_tbl
 *
 */
@Component
public class ExperimentDAO extends Limelight_JDBC_Base implements ExperimentDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( ExperimentDAO.class );


	/**
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public Integer getProjectIdForId( int id ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT project_id FROM experiment_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "project_id" );
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
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public Boolean getIsDraftForId( int id ) throws SQLException {
		
		Boolean result = null;
		
		final String querySQL = "SELECT draft_flag FROM experiment_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					int draftFlagNumber = rs.getInt( "draft_flag" );
					if ( draftFlagNumber == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result = true;
					} else {
						result = false;
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
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public Integer getCreatedByUserIdForId( int id ) throws SQLException {
		
		Integer result = null;
		
		final String querySQL = "SELECT created_by_user_id FROM experiment_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = rs.getInt( "created_by_user_id" );
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
	 * @param id
	 * @return
	 * @throws SQLException
	 */
	@Override
	public ExperimentDTO getPartialForId( int id ) throws SQLException {
		
		ExperimentDTO result = null;
		
		final String querySQL = "SELECT * FROM experiment_tbl WHERE id = ?";
		
		try ( Connection dbConnection = super.getDBConnection();
			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setInt( 1, id );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				if ( rs.next() ) {
					result = populatePartialFromResultSet( rs );
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
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public ExperimentDTO populatePartialFromResultSet( ResultSet rs ) throws SQLException {
		
		boolean draft = false;
		{
			int draftAsNumber = rs.getInt( "draft_flag" );
			if ( draftAsNumber == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
				draft = true;
			}
		}
		
		ExperimentDTO result = new ExperimentDTO();
		result.setId( rs.getInt( "id" ) );
		result.setProjectId( rs.getInt( "project_id" ) );
		result.setDraft( draft );
		int associatedSearchDataLookupParametersLookupId = rs.getInt( "assoc_search_data_lookup_parameters_id" );
		if ( ! rs.wasNull() ) {
			result.setAssociatedSearchDataLookupParametersLookupId( associatedSearchDataLookupParametersLookupId );
		}
		result.setName( rs.getString( "name" ) );
		result.setExperimentJSONMainData( rs.getString( "experiment_json__main_data" ) );
		result.setProjectSearchIdsOnlyJSON( rs.getString( "project_search_ids_only_json" ) );
		result.setVersionNumber(  rs.getInt( "version_number_main_json" ) );
		return result;
	}

	private static final String INSERT_SQL =
			"INSERT INTO experiment_tbl "
			+ " ( "
			+ " project_id, draft_flag, assoc_search_data_lookup_parameters_id, name, "
			+ " project_search_ids_only_json, experiment_json__main_data, version_number_main_json, experiment_revision_number, "
			+ " created_by_user_id, created_by_user_type, created_date_time, created_by_remote_ip, "
			+ " experiment_last_updated_by_user_id, experiment_last_updated_by_user_type, experiment_last_updated_date_time "
			+ " ) "
			+ " VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, NOW() )";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentDTO)
	 */
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ExperimentDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		if (  item.getCreatedByUserType() == null ) {
			throw new IllegalArgumentException( " item.getCreatedByUserType() == null " );
		}
		
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
							if ( item.isDraft() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							if ( item.getAssociatedSearchDataLookupParametersLookupId() != null ) {
								pstmt.setInt( counter, item.getAssociatedSearchDataLookupParametersLookupId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getName() );

							counter++;
							pstmt.setString( counter, item.getProjectSearchIdsOnlyJSON() );
							counter++;
							pstmt.setString( counter, item.getExperimentJSONMainData() );
							counter++;
							pstmt.setInt( counter, item.getVersionNumber() ); // version_number_main_json
							
							{
								counter++;
								int revisionNumber = 1; // default to 1 on save when Non-Draft;
								if ( item.isDraft() ) {
									revisionNumber = 0;  // default to 0 on save when Draft;
								}
								pstmt.setInt( counter, revisionNumber ); //  experiment_revision_number
							}
							
							counter++;
							if ( item.getCreatedByUserId() != null ) {
								pstmt.setInt( counter, item.getCreatedByUserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getCreatedByUserType().value() );
							counter++;
							pstmt.setString( counter, item.getCreatedByRemoteIP() );


							counter++;
							if ( item.getExperimentLastUpdatedByUserId() != null ) {
								pstmt.setInt( counter, item.getExperimentLastUpdatedByUserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getCreatedByUserType().value() );
							
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
			String msg = "ExperimentDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	private static final String UPDATE_MAIN_SQL =
			"UPDATE experiment_tbl SET "
			+ " draft_flag = ?, assoc_search_data_lookup_parameters_id = ?, name = ?, "
			+ " project_search_ids_only_json = ?, experiment_json__main_data = ?, "
			+ " version_number_main_json = ?, "
			+ " experiment_last_updated_by_user_id = ?, experiment_last_updated_by_user_type = ?, experiment_last_updated_date_time = NOW() ";
	
	private static final String UPDATE_experiment_revision_number_SQL =
			" , experiment_revision_number = experiment_revision_number + 1 ";
	
	private static final String UPDATE_WHERE_CLAUSE_SQL =
			" WHERE id = ? ";
	
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void update( ExperimentDTO item ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		if (  item.getExperimentLastUpdatedByUserId() == null ) {
			throw new IllegalArgumentException( " item.getExperimentLastUpdatedByUserId() == null " );
		}
		if (  item.getExperimentLastUpdatedByUserType() == null ) {
			throw new IllegalArgumentException( " item.getExperimentLastUpdatedByUserType() == null " );
		}

		//  NOT DOING:  If the user requests to change an experiment, we will provide a way to copy the experiment
		
//		Boolean isDraft = null;
//		try {
//			isDraft = this.getIsDraftForId( item.getId() );
//		} catch ( Exception e ) {
//			String msg = "update( ExperimentDTO item ): Exception calling: this.getIsDraftForId( item.getId(): " + item.getId();
//			log.warn( msg, e );
//			throw new LimelightDatabaseException( msg, e );
//		}
//		if ( isDraft == null ) {
//			String msg = "update( ExperimentDTO item ): experimentId not in database: " + item.getId();
//			log.warn( msg );
//			throw new LimelightDatabaseException( msg );
//		}
//		if ( ! isDraft.booleanValue() ) {
//			String msg = "update( ExperimentDTO item ): isDraft for experimentId is false.  Save Not allowed for Non-Draft Experiments. experimentId: " 
//					+ item.getId();
//			log.warn( msg );
//			throw new LimelightDatabaseException( msg );
//		}
		
		//  Not Allow Save as draft when not draft
		
		Boolean isDraft = null;
		try {
			isDraft = this.getIsDraftForId( item.getId() );
		} catch ( Exception e ) {
			String msg = "update( ExperimentDTO item ): Exception calling: this.getIsDraftForId( item.getId(): " + item.getId();
			log.warn( msg, e );
			throw new LimelightDatabaseException( msg, e );
		}
		if ( isDraft == null ) {
			String msg = "update( ExperimentDTO item ): experimentId not in database: " + item.getId();
			log.warn( msg );
			throw new LimelightDatabaseException( msg );
		}
		if ( ! isDraft.booleanValue() && item.isDraft() ) {
			String msg = "update( ExperimentDTO item ): isDraft for experimentId is false.  New value for isDraft is true which is Not Allowed. experimentId: " 
					+ item.getId();
			log.warn( msg );
			throw new LimelightDatabaseException( msg );
		}
		
		String update_experiment_revision_number_SQL_Local = "";
		
		if ( ! item.isDraft() ) {
			update_experiment_revision_number_SQL_Local = UPDATE_experiment_revision_number_SQL;
		}
		
		final String sql = UPDATE_MAIN_SQL + update_experiment_revision_number_SQL_Local + UPDATE_WHERE_CLAUSE_SQL;

		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql, Statement.RETURN_GENERATED_KEYS );
							int counter = 0;
							counter++;
							if ( item.isDraft() ) {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE );
							} else {
								pstmt.setInt( counter, Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_FALSE );
							}
							counter++;
							if ( item.getAssociatedSearchDataLookupParametersLookupId() != null ) {
								pstmt.setInt( counter, item.getAssociatedSearchDataLookupParametersLookupId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getName() );

							counter++;
							pstmt.setString( counter, item.getProjectSearchIdsOnlyJSON() );
							counter++;
							pstmt.setString( counter, item.getExperimentJSONMainData() );
							counter++;
							pstmt.setInt( counter, item.getVersionNumber() );

							counter++;
							if ( item.getExperimentLastUpdatedByUserId() != null ) {
								pstmt.setInt( counter, item.getExperimentLastUpdatedByUserId() );
							} else {
								pstmt.setNull(counter, java.sql.Types.INTEGER );
							}
							counter++;
							pstmt.setString( counter, item.getExperimentLastUpdatedByUserType().value() );
							
							counter++;
							pstmt.setInt( counter, item.getId() );
							
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "ExperimentDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}


	////
	
	private static final String UPDATE_LAST_ACCESSED_SQL =
			"UPDATE experiment_tbl "
			+ " SET last_accessed = NOW() WHERE id = ?";
	//  Spring DB Transactions
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	
	/* 
	 * SET last_accessed = NOW() WHERE id = ?
	 */
	public void updateLastAccessed( int id ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( UPDATE_LAST_ACCESSED_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "id: " + id + ", SQL: " + UPDATE_LAST_ACCESSED_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	/**
	 * @param id
	 * @throws Exception
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions

	public void delete( int id ) {

		final String sql = "DELETE FROM experiment_tbl WHERE id = ?";

		// Use Spring JdbcTemplate so Transactions work properly

		try {
//			int rowsUpdated = 
			this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( sql );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, id );
							return pstmt;
						}
					});
		} catch ( RuntimeException e ) {
			String msg = "Failed to delete, id: " + id + ", sql: " + sql;
			log.error( msg, e );
			throw e;
		}
	}
	

}
