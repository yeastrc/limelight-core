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
import org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentAssocProjectSearchIdDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table experiment_assoc_project_search_id_tbl
 *
 */
@Component
public class ExperimentAssocProjectSearchIdDAO extends Limelight_JDBC_Base implements ExperimentAssocProjectSearchIdDAO_IF   {

	private static final Logger log = LoggerFactory.getLogger( ExperimentAssocProjectSearchIdDAO.class );

	private static final String INSERT_SQL =
			"INSERT INTO experiment_assoc_project_search_id_tbl "
			+ " ( "
			+ " assoc_main_id, project_search_id "
			+ " ) "
			+ " VALUES ( ?, ? )";
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.ExperimentAssocProjectSearchIdDTO)
	 */
	
	//  Spring DB Transactions
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( ExperimentAssocProjectSearchIdDTO item ) {
		
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
							pstmt.setInt( counter, item.getAssocMainId() );
							counter++;
							pstmt.setInt( counter, item.getProjectSearchId() );

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
			String msg = "ExperimentAssocProjectSearchIdDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

	private static final String DELETE_FOR_ASSOC_MAIN_ID_SQL =
			"DELETE FROM experiment_assoc_project_search_id_tbl WHERE assoc_main_id = ?";
	
	//  Spring DB Transactions
	
	@Override
	@Transactional( propagation = Propagation.REQUIRED )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void delete_ForAssocMainId( int assocMainId ) {
		
		// Use Spring JdbcTemplate so Transactions work properly
		
		//  How to get the auto-increment primary key for the inserted record
		
		try {
			int rowsUpdated = this.getJdbcTemplate().update(
					new PreparedStatementCreator() {
						@Override
						public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {

							PreparedStatement pstmt =
									connection.prepareStatement( DELETE_FOR_ASSOC_MAIN_ID_SQL );
							int counter = 0;
							counter++;
							pstmt.setInt( counter, assocMainId );

							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "assocMainId: " + assocMainId + ", SQL: " + DELETE_FOR_ASSOC_MAIN_ID_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
