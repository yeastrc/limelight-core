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
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class PsmOpenModification_Masses_Positions_For_PsmIds_Searcher extends Limelight_JDBC_Base implements PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmOpenModification_Masses_Positions_For_PsmIds_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry {
		
		private long psmId;
		private double openModificationMass;
		private Integer openModificationPosition;
		private Boolean is_N_Terminal;
		private Boolean is_C_Terminal;
		
		public long getPsmId() {
			return psmId;
		}
		public double getOpenModificationMass() {
			return openModificationMass;
		}
		public Integer getOpenModificationPosition() {
			return openModificationPosition;
		}
		public Boolean getIs_N_Terminal() {
			return is_N_Terminal;
		}
		public Boolean getIs_C_Terminal() {
			return is_C_Terminal;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_IF#getPsmOpenModificationMassesFor_PsmIds(java.util.List)
	 */
	@Override
	public List<PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry> getPsmOpenModificationMassesFor_PsmIds( List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry> resultList = new ArrayList<>( psmIds.size() );

		StringBuilder sqlSB = new StringBuilder( 10000 );
	
		sqlSB.append( "SELECT psm_tbl.id as psm_id, psm_open_modification_tbl.mass, " );
		sqlSB.append( " psm_open_modification_position_tbl.position, psm_open_modification_position_tbl.is_n_terminal, psm_open_modification_position_tbl.is_c_terminal " );
		sqlSB.append( " FROM psm_tbl " );
		sqlSB.append( " INNER JOIN psm_open_modification_tbl ON psm_tbl.id = psm_open_modification_tbl.psm_id " );
		sqlSB.append( " LEFT OUTER JOIN psm_open_modification_position_tbl ON psm_open_modification_tbl.id = psm_open_modification_position_tbl.psm_open_modification_id " );
		sqlSB.append( " WHERE psm_tbl.id IN ( " );
		
		for ( int counter = 1; counter <= psmIds.size(); counter++ ) {
			if ( counter != 1 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( " ) " );
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
		
			for ( Long psmId : psmIds ) {
				counter++;
				preparedStatement.setLong( counter, psmId );
			}
			
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry result = new PsmOpenModification_Masses_Positions_For_PsmIds_Searcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.openModificationMass = rs.getDouble( "mass" );
					/// following only populated if psm_open_modification_position_tbl record joined in via Left Outer Join
					{
						int position = rs.getInt( "position" );
						if ( ! rs.wasNull() ) {
							result.openModificationPosition = position;
						}
					}
					{
						int is_n_terminalInt = rs.getInt( "is_n_terminal" );
						if ( ! rs.wasNull() ) {
							if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE == is_n_terminalInt ) {
								result.is_N_Terminal = true;
							} else {
								result.is_N_Terminal = false;
							}
						}
					}
					{
						int is_c_terminalInt = rs.getInt( "is_c_terminal" );
						if ( ! rs.wasNull() ) {
							if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE == is_c_terminalInt ) {
								result.is_C_Terminal = true;
							} else {
								result.is_C_Terminal = false;
							}
						}
					}
					resultList.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return resultList;		
	}


}
