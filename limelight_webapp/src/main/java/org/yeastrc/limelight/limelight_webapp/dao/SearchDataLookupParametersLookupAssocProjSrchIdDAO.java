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
import org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupAssocProjSrchIdDTO;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * table search_data_lookup_parameters_assoc_project_search_id
 *
 */
@Component
public class SearchDataLookupParametersLookupAssocProjSrchIdDAO extends Limelight_JDBC_Base implements SearchDataLookupParametersLookupAssocProjSrchIdDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( SearchDataLookupParametersLookupAssocProjSrchIdDAO.class );
//	
//	/* (non-Javadoc)
//	 * @see org.yeastrc.limelight.limelight_webapp.dao.ProjectDAO_IF#getForId(int)
//	 */
//	@Override
//	public SearchDataLookupParametersLookupAssocProjSrchIdDTO getForId( int id ) throws SQLException {
//		
//		SearchDataLookupParametersLookupAssocProjSrchIdDTO result = null;
//		
//		final String querySQL = "SELECT title, abstract FROM search_data_lookup_parameters_assoc_project_search_id WHERE id = ?";
//		
//		try ( Connection dbConnection = super.getDBConnection();
//			     PreparedStatement preparedStatement = dbConnection.prepareStatement( querySQL ) ) {
//			
//			preparedStatement.setInt( 1, id );
//			
//			try ( ResultSet rs = preparedStatement.executeQuery() ) {
//				if ( rs.next() ) {
//					result = new SearchDataLookupParametersLookupAssocProjSrchIdDTO();
//					result.setId( id );
//					result.setTitle( rs.getString( "title" ) );
//					result.setAbstractText( rs.getString( "abstract" ) );
//				}
//			}
//		} catch ( RuntimeException e ) {
//			String msg = "SQL: " + querySQL;
//			log.error( msg, e );
//			throw e;
//		} catch ( SQLException e ) {
//			String msg = "SQL: " + querySQL;
//			log.error( msg, e );
//			throw e;
//		}
//		
//		return result;
//	}

	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.dao.SearchDataLookupParametersLookupAssocProjSrchIdDAO_IF#save(org.yeastrc.limelight.limelight_webapp.db_dto.SearchDataLookupParametersLookupAssocProjSrchIdDTO)
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.MANDATORY )  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring Transactions
	
	public void save( SearchDataLookupParametersLookupAssocProjSrchIdDTO item ) {
		
		final String INSERT_SQL = "INSERT INTO search_data_lookup_parameters_assoc_project_search_id ( assoc_main_id, project_search_id ) VALUES ( ?, ? )";
		
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
			String msg = "SearchDataLookupParametersLookupAssocProjSrchIdDTO: " + item + ", SQL: " + INSERT_SQL;
			log.error( msg, e );
			throw e;
		}
	}


}
