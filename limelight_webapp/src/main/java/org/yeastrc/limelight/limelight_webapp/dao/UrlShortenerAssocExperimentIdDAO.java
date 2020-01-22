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

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.db_dto.UrlShortenerAssocExperimentIdDTO;

/**
 * table url_shortener_associated_experiment_id_tbl
 *
 */
@Component
public class UrlShortenerAssocExperimentIdDAO extends Limelight_JDBC_Base implements UrlShortenerAssocExperimentIdDAO_IF  {

	private static final Logger log = LoggerFactory.getLogger( UrlShortenerAssocExperimentIdDAO.class );

	private static final String INSERT_SQL = 
			"INSERT INTO url_shortener_associated_experiment_id_tbl "
			+ "( url_shortener_id, experiment_id ) "
			+ "VALUES ( ?, ? )";
	
	/**
	 * @param item
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( UrlShortenerAssocExperimentIdDTO item ) {
		
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
							pstmt.setInt( counter, item.getUrlShortenerId());
							counter++;
							pstmt.setInt( counter, item.getExperimentId() );
							return pstmt;
						}
					});

		} catch ( RuntimeException e ) {
			String msg = "ProjectDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}

}
