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
public class OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher extends Limelight_JDBC_Base implements OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( OpenModificationPositions_PsmLevel_ForOpenModIds_Searcher.class );
	
	private static final String QUERY_START_SQL = 
			"SELECT "
			+ " id, psm_open_modification_id, position, is_n_terminal, is_c_terminal "
			+ " FROM "
			+ " psm_open_modification_position_tbl  "
			+ " WHERE psm_open_modification_id in ( ";
	
	

	/**
	 * @param psmOpenModificationIdList
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<PsmOpenModificationPositionDTO> get_OpenModificationMasses_PsmLevel_For_psmOpenModificationIds( List<Long> psmOpenModificationIdList ) throws SQLException {

		int resultSize = psmOpenModificationIdList.size() * 5;
		List<PsmOpenModificationPositionDTO> result = new ArrayList<>( resultSize );
		
		if ( psmOpenModificationIdList.isEmpty() ) {
			//  No Request psmOpenModificationIds so return
			return result; // EARLY RETURN
		}

		int query_StringBuilderSize = 300 + ( 20 * psmOpenModificationIdList.size() );
		StringBuilder querySQL_SB = new StringBuilder( query_StringBuilderSize );
		
		querySQL_SB.append( QUERY_START_SQL );
		
		for ( int counter = 1; counter <= psmOpenModificationIdList.size(); counter++ ) {
			if ( counter != 1 ) {
				//  Not first so add ","
				querySQL_SB.append( "," );
			}
			querySQL_SB.append( "?" );
		}
		
		querySQL_SB.append( ")" );
		
		final String querySQL = querySQL_SB.toString();
				
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( querySQL ) ) {
			
			int counter = 0;
			
			for ( Long psmId : psmOpenModificationIdList ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while ( rs.next() ) {

					PsmOpenModificationPositionDTO resultItem = new PsmOpenModificationPositionDTO();
					result.add( resultItem );

					resultItem.setId( rs.getLong( "id" ) );
					resultItem.setPsmOpenModificationId( rs.getLong( "psm_open_modification_id" ) );
					resultItem.setPosition( rs.getInt( "position" ) );
					{
						int intVal = rs.getInt( "is_n_terminal" );
						if ( intVal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							resultItem.setIs_N_Terminal(true);
						}
					}
					{
						int intVal = rs.getInt( "is_c_terminal" );
						if ( intVal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
							resultItem.setIs_C_Terminal(true);
						}
					}
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return result;
	}
	
}
