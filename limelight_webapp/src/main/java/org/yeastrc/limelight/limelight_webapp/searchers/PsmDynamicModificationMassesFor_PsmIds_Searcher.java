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
 * Variable/Dynamic Modifications at PSM level
 *
 */
@Component
public class PsmDynamicModificationMassesFor_PsmIds_Searcher extends Limelight_JDBC_Base implements PsmDynamicModificationMassesFor_PsmIds_Searcher_IF   {

	private static final Logger log = LoggerFactory.getLogger( PsmDynamicModificationMassesFor_PsmIds_Searcher.class );

	/**
	 * 
	 *
	 */
	public static class PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry {
		
		private long psmId;
		private long psmDynamicModificationId;
		private double dynamicModificationMass;
		private int position;
		private boolean is_N_Terminal;
		private boolean is_C_Terminal;
		
		public long getPsmId() {
			return psmId;
		}
		public double getDynamicModificationMass() {
			return dynamicModificationMass;
		}
		public long getPsmDynamicModificationId() {
			return psmDynamicModificationId;
		}
		public boolean isIs_N_Terminal() {
			return is_N_Terminal;
		}
		public boolean isIs_C_Terminal() {
			return is_C_Terminal;
		}
		public int getPosition() {
			return position;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmDynamicModificationMassesFor_PsmIds_Searcher_IF#getPsmDynamicModificationMassesFor_PsmIds(java.util.List)
	 */
	@Override
	public List<PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry> getPsmDynamicModificationMassesFor_PsmIds( List<Long> psmIds ) throws Exception {
		
		if ( psmIds == null || psmIds.isEmpty() ) {
			return new ArrayList<>();
		}
		
		List<PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry> resultList = new ArrayList<>();
		
		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		sqlSB.append( "SELECT psm_dynamic_modification_tbl.psm_id AS psm_id, psm_dynamic_modification_tbl.mass, psm_dynamic_modification_tbl.position, psm_dynamic_modification_tbl.is_n_terminal, psm_dynamic_modification_tbl.is_c_terminal, " );
		sqlSB.append( " psm_dynamic_modification_tbl.id AS psm_dynamic_modification_id " );
		sqlSB.append( " FROM psm_dynamic_modification_tbl " );
		sqlSB.append( " WHERE psm_dynamic_modification_tbl.psm_id IN ( " );
		
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
					PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry result = new PsmDynamicModificationMassesFor_PsmIds_Searcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.psmDynamicModificationId = rs.getLong( "psm_dynamic_modification_id" );
					result.dynamicModificationMass = rs.getDouble( "mass" );
					
					result.position = rs.getInt( "position" );
					
					int is_n_terminal = rs.getInt( "is_n_terminal" );
					if ( is_n_terminal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.is_N_Terminal = true;
					}
					int is_c_terminal = rs.getInt( "is_c_terminal" );
					if ( is_c_terminal == Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE ) {
						result.is_C_Terminal = true;
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
