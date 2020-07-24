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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.dto.PsmOpenModificationPositionDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class PsmOpenModificationPosition_Searcher extends Limelight_JDBC_Base implements PsmOpenModificationPosition_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmOpenModificationPosition_Searcher.class );
	
	private static final String QUERY_SQL = 
			"SELECT * "
			+ " FROM "
			+ " psm_open_modification_position_tbl "
			+ " WHERE psm_open_modification_id = ? ";

	
	@Override
	public List<PsmOpenModificationPositionDTO>  getPsmOpenModificationPosition( long psmOpenModificationId ) throws SQLException {

		List<PsmOpenModificationPositionDTO> resultList = new ArrayList<>();

		final String querySQL = QUERY_SQL;
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			preparedStatement.setLong( 1, psmOpenModificationId );
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {
					PsmOpenModificationPositionDTO item = new PsmOpenModificationPositionDTO();
					item.setId( rs.getLong( "id" ) );
					item.setPsmOpenModificationId( rs.getLong( "psm_open_modification_id" ) );
					item.setPosition( rs.getInt( "position" ) );
								
					int is_n_terminal = rs.getInt( "is_n_terminal" );
					if ( is_n_terminal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						item.setIs_N_Terminal( true );
					}
					int is_c_terminal = rs.getInt( "is_c_terminal" );
					if ( is_c_terminal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						item.setIs_C_Terminal( true );
					}
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}

}
